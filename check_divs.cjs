const fs = require('fs');
const content = fs.readFileSync('src/components/AiChangedSeo.astro', 'utf8');

let stack = [];
let lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  let m;
  const openRegex = /<div[^>]*>/g;
  while ((m = openRegex.exec(line)) !== null) {
    stack.push(i + 1);
  }
  const closeRegex = /<\/div>/g;
  while ((m = closeRegex.exec(line)) !== null) {
    if (stack.length > 0) {
      stack.pop();
    } else {
      console.log(`Unmatched close at line ${i + 1}`);
    }
  }
}
console.log(`Unmatched opens: ${stack.length}`);
if (stack.length > 0) {
  console.log(`Lines with unmatched opens:`, stack);
}
