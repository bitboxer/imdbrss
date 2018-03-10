export default function loadUrl(fetch, url) {
  return (async function load() {
    try {
      const res = await fetch(url);
      const body = await res.text();
      return { body };
    } catch (e) {
      return { body: '' };
    }
  }());
}
