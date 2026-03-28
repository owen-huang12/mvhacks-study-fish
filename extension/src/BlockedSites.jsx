import { useState, useEffect } from "react";

export default function BlockedSites() {
  const [sites, setSites] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    chrome.storage.local.get("blockedSites", (result) => {
      setSites(result.blockedSites || []);
    });
  }, []);

  function addSite() {
    const value = input
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .replace(/\/.*$/, "");
    if (!value || sites.includes(value)) {
      setInput("");
      return;
    }
    const next = [...sites, value];
    chrome.storage.local.set({ blockedSites: next });
    setSites(next);
    setInput("");
  }

  function removeSite(site) {
    const next = sites.filter((s) => s !== site);
    chrome.storage.local.set({ blockedSites: next });
    setSites(next);
  }

  return (
    <div className="page">
      <h1>blocked sites</h1>
      <p className="blocked-desc">visiting these sends you to the abyss</p>
      <div className="blocked-input-row">
        <input
          className="blocked-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addSite()}
          placeholder="instagram.com"
          spellCheck={false}
        />
        <button className="blocked-add-btn" onClick={addSite}>
          add
        </button>
      </div>
      <ul className="blocked-list">
        {sites.length === 0 && (
          <li className="blocked-empty">no sites blocked yet</li>
        )}
        {sites.map((site) => (
          <li key={site} className="blocked-item">
            <span className="blocked-site-name">{site}</span>
            <button
              className="blocked-remove-btn"
              onClick={() => removeSite(site)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
