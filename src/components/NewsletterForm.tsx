'use client';

export default function NewsletterForm() {
  return (
    <form className="nlform" onSubmit={(e) => e.preventDefault()}>
      <input type="email" placeholder="ваша.адреса@пошта" aria-label="Email" />
      <button className="btn btn--red" type="submit">Підписатись</button>
    </form>
  );
}
