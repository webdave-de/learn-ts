var arr = [10, 11, 12, 13, 14];

for (let i = 0; i <= arr.length - 1; i++) {
  var t = setTimeout(function () {
    console.log('Index:', i, '=>', arr[i]);
  }, 3000);
}

clearTimeout(t);

const hanna = {
    augen: 2,
    haare: 'schwarz',
    worte: 'HOI',
    gruessen: function(){console.log(this.worte)},
    rufen: ()=>console.log(this.worte)
}
hanna.gruessen();
hanna.rufen();


// ES5
if (false) {
  var state = 1;
  state++;
}
if (true) {
  var state = 1;
  state++;
}

console.log(state);

// ES2015
if (false) {
  const info = 1;
}
if (true) {
  let info = 6516498;
  info = 7;
  console.log(info);
}
