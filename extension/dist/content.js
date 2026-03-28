(function(){chrome.storage.local.get(`blockedSites`,function(e){var t=e.blockedSites||[];if(t.length){var n=location.hostname.replace(/^www\./,``).toLowerCase();if(t.some(function(e){var t=e.replace(/^www\./,``).toLowerCase();return n===t||n.endsWith(`.`+t)})){var r=`you have gone off the deep end.`,i=chrome.runtime.getURL(`background.png`),a=chrome.runtime.getURL(`LowresPixel-Regular.otf`),o=location.hostname.replace(/^www\./,``);document.documentElement.innerHTML=`
<head>
<meta charset="utf-8">
<title>you are in the abyss</title>
<style>
  @font-face {
    font-family: 'LowresPixel';
    src: url('${a}') format('opentype');
  }

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 100%; height: 100%; overflow: hidden; }

  body {
    background-image: url('${i}');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'LowresPixel', 'Courier New', monospace;
    position: relative;
  }

  /* subtle dark overlay so text box pops */
  body::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(5, 15, 35, 0.35);
  }

  /* the box — matches .modal-box style from the extension */
  .abyss-box {
    position: relative;
    z-index: 10;
    background: rgba(10, 25, 55, 0.72);
    border: 2px dashed rgba(140, 185, 232, 0.45);
    border-radius: 6px;
    padding: 32px 36px 28px;
    max-width: 420px;
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
  }

  .label {
    font-family: 'LowresPixel', 'Courier New', monospace;
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgba(140, 185, 232, 0.5);
  }

  .title {
    font-family: 'LowresPixel', 'Courier New', monospace;
    font-size: 28px;
    color: #a8cce8;
    letter-spacing: 1px;
    line-height: 1.35;
    text-align: center;
  }

  .divider {
    width: 60%;
    height: 1px;
    background: rgba(140, 185, 232, 0.2);
    margin: 2px 0;
  }

  .quip {
    font-family: 'LowresPixel', 'Courier New', monospace;
    font-size: 13px;
    color: rgba(160, 200, 235, 0.65);
    text-align: center;
    line-height: 1.7;
  }

  .back {
    margin-top: 6px;
    padding: 9px 22px;
    background: rgba(74, 90, 154, 0.35);
    border: 2px solid rgba(100, 130, 200, 0.45);
    border-radius: 4px;
    color: #a8cce8;
    font-family: 'LowresPixel', 'Courier New', monospace;
    font-size: 13px;
    letter-spacing: 1px;
    cursor: pointer;
    transition: background 0.18s, border-color 0.18s;
  }
  .back:hover {
    background: rgba(74, 90, 154, 0.55);
    border-color: rgba(140, 170, 230, 0.65);
  }
</style>
</head>
<body>
<div class="abyss-box">
  <div class="label">${o} is blocked</div>
  <div class="title">you are<br>in the abyss</div>
  <div class="divider"></div>
  <div class="quip">404: ${r}</div>
  <button class="back" onclick="history.back()">&#8592; swim back</button>
</div>
</body>`}}})})();