import HashMap from './hashmap.js';
import HashSet from './hashset.js';

const test = new HashMap();

//Populate
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

//Inspect
console.log('--- AFTER 12 INSERTS ---');
console.log('size:', test.length());
console.log('capacity:', test.capacity);
console.log('load:', test.length() / test.capacity);
console.log('buckets:', test.buckets);

//Overwrite
test.set('apple', 'green');
test.set('banana', 'green');

console.log('\n--- AFTER OVERWRITES ---');
console.log('size:', test.length());
console.log('capacity:', test.capacity);
console.log('apple:', test.get('apple'));
console.log('banana:', test.get('banana'));

//Trigger resize
test.set('moon', 'silver');

console.log('\n--- AFTER RESIZE ---');
console.log('size:', test.length());
console.log('capacity:', test.capacity);
console.log('load:', test.length() / test.capacity);
console.log('buckets:', test.buckets);

//Test other methods
console.log('\n--- METHOD TESTS ---');
console.log('has moon:', test.has('moon'));
console.log('get dog:', test.get('dog'));
console.log('remove dog:', test.remove('dog'));
console.log('has dog:', test.has('dog'));
console.log('keys:', test.keys());
console.log('values:', test.values());
console.log('entries:', test.entries());

//Test HashSet
const test2 = new HashSet();
test2.set('example');
console.log('set:', test2.keys());
console.log('size:', test2.length());
