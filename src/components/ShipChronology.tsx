"use client";

import { useState, useRef, useEffect } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────

export interface ShipMeta {
  id: string;
  name: string;
  hull_number: string;
  commissioned: string;
  color: string;
}

export interface LocationMeta {
  name: string;
  lat: number;
  lng: number;
  type: string;
}

export interface Position {
  id: string;
  ship: string;
  from: string;
  to: string;
  location: string;
  note: string;
}

export interface ChronologyEvent {
  id: string;
  type: string;
  date: string;
  ships: string[];
  location: string;
  title: string;
  description: string;
  sources: string[];
  importance: number;
  casualties?: string;
  verified?: boolean;
}

export interface ChronologyData {
  meta: {
    title: string;
    version: string;
    ships: ShipMeta[];
    locations: Record<string, LocationMeta>;
    event_types: Record<string, string>;
  };
  positions: Position[];
  events: ChronologyEvent[];
}

// ─── Constants ──────────────────────────────────────────────────────────────

const EVENT_ICONS: Record<string, string> = {
  strike_outgoing: "🚀",
  strike_incoming: "💥",
  transit: "→",
  incident: "⚠",
  command: "★",
  operation: "◈",
  context: "◉",
};

const EVENT_LABELS: Record<string, string> = {
  strike_outgoing: "Удар",
  strike_incoming: "Ураження",
  transit: "Перехід",
  incident: "Інцидент",
  command: "Командування",
  operation: "Операція",
  context: "Контекст",
};

const EVENT_COLORS: Record<string, string> = {
  strike_outgoing: "#c44a08",
  strike_incoming: "#FF6B35",
  transit: "#1F4E78",
  incident: "#8C2D04",
  command: "#5C6B7A",
  operation: "#2E7D32",
  context: "#4A148C",
};

// ─── Helpers ────────────────────────────────────────────────────────────────

function parseDate(s: string): Date {
  return new Date(s + "T00:00:00Z");
}

function formatShort(d: Date): string {
  return d.toLocaleDateString("uk-UA", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function formatFull(s: string): string {
  return parseDate(s).toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function pct(date: Date, start: Date, end: Date): number {
  return Math.max(
    0,
    Math.min(
      100,
      ((date.getTime() - start.getTime()) / (end.getTime() - start.getTime())) *
        100,
    ),
  );
}

// ─── Gantt View ─────────────────────────────────────────────────────────────

export function GanttView({ data }: { data: ChronologyData }) {
  const { ships } = data.meta;
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    content: string;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const allDates = [
    ...data.positions.map((p) => parseDate(p.from)),
    ...data.positions.map((p) => parseDate(p.to)),
    ...data.events.map((e) => parseDate(e.date)),
  ];
  const rangeStart = new Date(Math.min(...allDates.map((d) => d.getTime())));
  const rangeEnd = new Date(Math.max(...allDates.map((d) => d.getTime())));
  // Pad slightly
  rangeStart.setUTCMonth(rangeStart.getUTCMonth() - 1);
  rangeEnd.setUTCMonth(rangeEnd.getUTCMonth() + 1);

  // Year tick marks
  const ticks: Date[] = [];
  for (
    let y = rangeStart.getUTCFullYear() + 1;
    y <= rangeEnd.getUTCFullYear();
    y++
  ) {
    ticks.push(new Date(`${y}-01-01T00:00:00Z`));
  }

  const ROW_H = 48;
  const LABEL_W = 140;
  const CHART_H = ships.length * ROW_H + 32;

  function showTip(e: React.MouseEvent, text: string) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      content: text,
    });
  }

  return (
    <div ref={containerRef} style={{ position: "relative", overflowX: "auto" }}>
      <svg
        width="100%"
        height={CHART_H}
        style={{ display: "block", minWidth: 600, fontFamily: "var(--sans)" }}
        onMouseLeave={() => setTooltip(null)}
      >
        {/* Year tick lines */}
        {ticks.map((tick) => {
          const x =
            LABEL_W +
            (pct(tick, rangeStart, rangeEnd) / 100) * (100 - LABEL_W / 8);
          return (
            <g key={tick.getUTCFullYear()}>
              <line
                x1={`${x}%`}
                y1={0}
                x2={`${x}%`}
                y2={CHART_H - 24}
                stroke="#D7DEE5"
                strokeWidth={2}
              />
              <text
                x={`${x}%`}
                y={CHART_H - 8}
                textAnchor="middle"
                fontSize={10}
                fill="#5C6B7A"
                fontFamily="var(--sans)"
                letterSpacing={1}
              >
                {tick.getUTCFullYear()}
              </text>
            </g>
          );
        })}

        {/* Ship rows */}
        {ships.map((ship, si) => {
          const y = si * ROW_H + 4;
          const barY = y + 14;
          const BAR_H = 16;
          const shipPositions = data.positions.filter(
            (p) => p.ship === ship.id,
          );
          const shipEvents = data.events.filter((e) =>
            e.ships.includes(ship.id),
          );

          return (
            <g key={ship.id}>
              {/* Row bg */}
              <rect
                x={0}
                y={y}
                width="100%"
                height={ROW_H - 4}
                fill={si % 2 === 0 ? "#F8F9FA" : "#FFFFFF"}
                opacity={0.5}
              />

              {/* Ship label */}
              <text
                x={8}
                y={barY + BAR_H / 2 + 4}
                fontSize={11}
                fontWeight={700}
                fill={ship.color}
                fontFamily="var(--sans)"
                letterSpacing={0.5}
              >
                {ship.name.replace("Адмірал ", "")}
              </text>

              {/* Position bars */}
              {shipPositions.map((pos) => {
                const xFrom = pct(parseDate(pos.from), rangeStart, rangeEnd);
                const xTo = pct(parseDate(pos.to), rangeStart, rangeEnd);
                const locName =
                  data.meta.locations[pos.location]?.name ?? pos.location;
                return (
                  <rect
                    key={pos.id}
                    x={`${LABEL_W / 8 + xFrom * (1 - LABEL_W / 800)}%`}
                    y={barY}
                    width={`${(xTo - xFrom) * (1 - LABEL_W / 800)}%`}
                    height={BAR_H}
                    fill={ship.color}
                    opacity={0.25}
                    rx={2}
                    style={{ cursor: "pointer" }}
                    onMouseMove={(e) =>
                      showTip(
                        e,
                        `${locName}\n${formatShort(parseDate(pos.from))} – ${formatShort(parseDate(pos.to))}\n${pos.note}`,
                      )
                    }
                    onMouseLeave={() => setTooltip(null)}
                  />
                );
              })}

              {/* Event markers */}
              {shipEvents.map((ev) => {
                const xEv = pct(parseDate(ev.date), rangeStart, rangeEnd);
                const cx = `${LABEL_W / 8 + xEv * (1 - LABEL_W / 800)}%`;
                const cy = barY + BAR_H / 2;
                const color = EVENT_COLORS[ev.type] ?? "#5C6B7A";
                return (
                  <g
                    key={ev.id}
                    style={{ cursor: "pointer" }}
                    onMouseMove={(e) =>
                      showTip(
                        e,
                        `${formatFull(ev.date)}\n${EVENT_LABELS[ev.type] ?? ev.type}\n${ev.title}`,
                      )
                    }
                    onMouseLeave={() => setTooltip(null)}
                  >
                    <circle cx={cx} cy={cy} r={5} fill={color} />
                    <circle
                      cx={cx}
                      cy={cy}
                      r={7}
                      fill="none"
                      stroke={color}
                      strokeWidth={1}
                      opacity={0.4}
                    />
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>

      {/* Ship color legend */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "6px 16px",
          marginTop: 12,
          paddingBottom: 8,
          borderBottom: "1px solid #E8ECF0",
        }}
      >
        {ships.map((ship) => (
          <span
            key={ship.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontFamily: "var(--sans)",
              fontSize: 10,
              color: "#5C6B7A",
              letterSpacing: "0.04em",
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: ship.color,
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            {ship.name}
          </span>
        ))}
      </div>

      {/* Event type legend */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px 16px",
          marginTop: 8,
        }}
      >
        {Object.entries(EVENT_ICONS).map(([type, icon]) => (
          <span
            key={type}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontFamily: "var(--sans)",
              fontSize: 10,
              color: "#5C6B7A",
              letterSpacing: "0.05em",
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: EVENT_COLORS[type],
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            {EVENT_LABELS[type]}
          </span>
        ))}
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontFamily: "var(--sans)",
            fontSize: 10,
            color: "#5C6B7A",
            letterSpacing: "0.05em",
          }}
        >
          <span
            style={{
              width: 24,
              height: 8,
              background: "#1F4E78",
              opacity: 0.3,
              display: "inline-block",
              borderRadius: 2,
            }}
          />
          Базування
        </span>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          style={{
            position: "absolute",
            left: tooltip.x + 12,
            top: tooltip.y - 8,
            background: "#0E1B2A",
            color: "#E8EDF2",
            padding: "8px 12px",
            borderRadius: 4,
            fontSize: 12,
            fontFamily: "var(--sans)",
            lineHeight: 1.45,
            maxWidth: 280,
            whiteSpace: "pre-line",
            pointerEvents: "none",
            zIndex: 10,
            boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
}

// ─── Journal View ────────────────────────────────────────────────────────────

function JournalView({ data }: { data: ChronologyData }) {
  const { ships } = data.meta;
  const [shipFilter, setShipFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const allTypes = Array.from(new Set(data.events.map((e) => e.type)));

  const filtered = data.events
    .filter((e) => shipFilter === "all" || e.ships.includes(shipFilter))
    .filter((e) => typeFilter === "all" || e.type === typeFilter)
    .sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());

  function toggleExpand(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const chipBase: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    padding: "3px 10px",
    borderRadius: 2,
    border: "1px solid",
    fontFamily: "var(--sans)",
    fontSize: 10,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "all .15s",
    fontWeight: 700,
  };

  function chipStyle(active: boolean, color: string): React.CSSProperties {
    return {
      ...chipBase,
      background: active ? color : "transparent",
      color: active ? "#fff" : color,
      borderColor: color,
    };
  }

  return (
    <div>
      {/* Ship filters */}
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}
      >
        <button
          style={chipStyle(shipFilter === "all", "#5C6B7A")}
          onClick={() => setShipFilter("all")}
        >
          Всі кораблі
        </button>
        {ships.map((ship) => (
          <button
            key={ship.id}
            style={chipStyle(shipFilter === ship.id, ship.color)}
            onClick={() => setShipFilter(ship.id)}
          >
            {ship.name.replace("Адмірал ", "")}
          </button>
        ))}
      </div>

      {/* Type filters */}
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}
      >
        <button
          style={chipStyle(typeFilter === "all", "#5C6B7A")}
          onClick={() => setTypeFilter("all")}
        >
          Всі типи
        </button>
        {allTypes.map((type) => (
          <button
            key={type}
            style={chipStyle(
              typeFilter === type,
              EVENT_COLORS[type] ?? "#5C6B7A",
            )}
            onClick={() => setTypeFilter(type)}
          >
            {EVENT_LABELS[type] ?? type}
          </button>
        ))}
      </div>

      {/* Event count */}
      <div
        style={{
          fontFamily: "var(--sans)",
          fontSize: 10,
          color: "#5C6B7A",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginBottom: 12,
        }}
      >
        {filtered.length} подій
      </div>

      {/* Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {filtered.map((ev) => {
          const isOpen = expanded.has(ev.id);
          const eventShips = ev.ships
            .map((sid) => ships.find((s) => s.id === sid))
            .filter(Boolean) as ShipMeta[];
          const locName = data.meta.locations[ev.location]?.name ?? ev.location;
          const color = EVENT_COLORS[ev.type] ?? "#5C6B7A";

          return (
            <div
              key={ev.id}
              style={{
                border: "1px solid #E8ECF0",
                borderLeft: `3px solid ${color}`,
                background: "#fff",
                padding: "12px 16px",
              }}
            >
              {/* Header row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  marginBottom: 6,
                }}
              >
                {/* Date + type */}
                <div style={{ flexShrink: 0, minWidth: 90 }}>
                  <div
                    style={{
                      fontFamily: "var(--sans)",
                      fontSize: 10,
                      color: "#5C6B7A",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {formatFull(ev.date)}
                  </div>
                  <span
                    style={{
                      display: "inline-block",
                      marginTop: 3,
                      background: color,
                      color: "#fff",
                      fontFamily: "var(--sans)",
                      fontSize: 9,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "1px 5px",
                      borderRadius: 2,
                    }}
                  >
                    {EVENT_LABELS[ev.type] ?? ev.type}
                  </span>
                </div>

                {/* Title + ships */}
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "var(--serif)",
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#0E1B2A",
                      lineHeight: 1.2,
                      marginBottom: 4,
                    }}
                  >
                    {ev.title}
                    {ev.verified === false && (
                      <span
                        style={{
                          marginLeft: 6,
                          fontSize: 9,
                          fontFamily: "var(--sans)",
                          color: "#5C6B7A",
                          letterSpacing: "0.1em",
                          verticalAlign: "middle",
                        }}
                      >
                        ⚠ НЕПІДТВЕРДЖЕНО
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 4,
                      alignItems: "center",
                    }}
                  >
                    {eventShips.map((ship) => (
                      <span
                        key={ship.id}
                        style={{
                          fontFamily: "var(--sans)",
                          fontSize: 9,
                          letterSpacing: "0.08em",
                          color: ship.color,
                          border: `1px solid ${ship.color}`,
                          padding: "1px 5px",
                          borderRadius: 2,
                        }}
                      >
                        {ship.name}
                      </span>
                    ))}
                    <span
                      style={{
                        fontFamily: "var(--sans)",
                        fontSize: 9,
                        color: "#5C6B7A",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {locName}
                    </span>
                  </div>
                </div>

                {/* Importance dots */}
                <div
                  style={{
                    flexShrink: 0,
                    display: "flex",
                    gap: 2,
                    paddingTop: 3,
                  }}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: i < ev.importance ? color : "#E8ECF0",
                        display: "inline-block",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Casualties */}
              {ev.casualties && (
                <div
                  style={{
                    fontFamily: "var(--sans)",
                    fontSize: 10,
                    color: "#c44a08",
                    letterSpacing: "0.06em",
                    marginBottom: 6,
                    textTransform: "uppercase",
                  }}
                >
                  ▸ {ev.casualties}
                </div>
              )}

              {/* Description */}
              <div
                style={{
                  fontSize: 13,
                  lineHeight: 1.5,
                  color: "#2C3E50",
                  display: "-webkit-box",
                  WebkitLineClamp: isOpen ? "unset" : 3,
                  WebkitBoxOrient: "vertical",
                  overflow: isOpen ? "visible" : "hidden",
                }}
              >
                {ev.description}
              </div>

              {/* Expand / Sources row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 8,
                  gap: 12,
                }}
              >
                <button
                  onClick={() => toggleExpand(ev.id)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    fontFamily: "var(--sans)",
                    fontSize: 10,
                    color: "#1F4E78",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {isOpen ? "▲ Згорнути" : "▼ Читати далі"}
                </button>
                {isOpen && ev.sources.length > 0 && (
                  <div
                    style={{
                      fontFamily: "var(--sans)",
                      fontSize: 9,
                      color: "#5C6B7A",
                      letterSpacing: "0.05em",
                      textAlign: "right",
                      flex: 1,
                    }}
                  >
                    {ev.sources.join(" · ")}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div
          style={{
            padding: "32px 0",
            textAlign: "center",
            fontFamily: "var(--sans)",
            fontSize: 11,
            color: "#5C6B7A",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Немає подій за обраними фільтрами
        </div>
      )}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function ShipChronology({ data }: { data: ChronologyData }) {
  const [mode, setMode] = useState<"gantt" | "journal">("gantt");

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: "6px 18px",
    border: "none",
    background: active ? "#0E1B2A" : "transparent",
    color: active ? "#fff" : "#5C6B7A",
    fontFamily: "var(--mono)",
    fontSize: 11,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    cursor: "pointer",
    fontWeight: 700,
    borderBottom: active ? "2px solid #c44a08" : "2px solid transparent",
    transition: "all .15s",
  });

  return (
    <div
      style={{
        border: "1px solid #D7DEE5",
        borderTop: "3px solid #0E1B2A",
        background: "#FAFAF7",
        margin: "32px 0",
        fontFamily: "var(--sans)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 16px 0",
          borderBottom: "1px solid #D7DEE5",
          background: "#F0F2F4",
        }}
      >
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            color: "#5C6B7A",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            paddingBottom: 10,
          }}
        >
          {data.meta.title}
        </div>
        <div style={{ display: "flex", gap: 0 }}>
          <button
            style={tabStyle(mode === "gantt")}
            onClick={() => setMode("gantt")}
          >
            Хронологія
          </button>
          <button
            style={tabStyle(mode === "journal")}
            onClick={() => setMode("journal")}
          >
            Журнал подій
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: 16 }}>
        {mode === "gantt" && <GanttView data={data} />}
        {mode === "journal" && <JournalView data={data} />}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "6px 16px",
          borderTop: "1px solid #D7DEE5",
          fontFamily: "var(--sans)",
          fontSize: 9,
          color: "#5C6B7A",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>
          {data.meta.ships.length} кораблів · {data.events.length} подій · v
          {data.meta.version}
        </span>
        <span>PLITKA Analytics</span>
      </div>
    </div>
  );
}
