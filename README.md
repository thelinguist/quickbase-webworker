# Quickbase Web Workers

Quickbase's javascript SDK is handy, but runs on the main UI thread. This bogs down any code page you might create, 
especially when big data is involved. So let API calls be handled in another thread by Web Workers!

Web workers are a feature of HTML 5, so consider your compatibility requirements when implementing web workers.

To enable, write a web worker as a single code page, and reference it in the script where you generate web workers:
```text
- Code pages
| - webworker.js
| - yourCustomCodePage.js
```

[hit me up](mailto:bshelley@mcftech.com)
