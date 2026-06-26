const fs = require('fs');
const content = fs.readFileSync('src/components/AiChangedSeo.astro', 'utf8');

let lines = content.split('\n');
let indent = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  const divMatches = line.match(/<div[^>]*>|<\/div>/g);
  if (!divMatches) continue;
  
  let out = "";
  for (const match of divMatches) {
    if (match.startsWith("</")) {
      indent = Math.max(0, indent - 1);
      out += "  ".repeat(indent) + "</div> (" + (i+1) + ")\n";
    } else {
      let className = match.match(/class="([^"]+)"/);
      className = className ? className[1] : "";
      out += "  ".repeat(indent) + `<div class="${className}"> (${i+1})\n`;
      indent++;
    }
  }
  if (line.includes('comparison-row') || line.includes('row-info-col') || line.includes('comparison-visuals') || line.includes('cards-comparison-grid') || line.includes('comparison-column') || line.includes('visual-comparison-card')) {
    console.log(out.trimEnd());
  }
}
