const fs = require('fs');
const content = fs.readFileSync('src/components/AiChangedSeo.astro', 'utf8');
let lines = content.split('\n');
let indent = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const divMatches = line.match(/<div[^>]*>|<\/div>/g);
  if (!divMatches) continue;
  for (const match of divMatches) {
    if (match.startsWith("</")) {
      indent--;
      if (indent < 0) console.log("UNBALANCED at line " + (i+1));
    } else {
      indent++;
    }
  }
}
console.log("Final indent: " + indent);
