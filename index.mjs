import crypto from "crypto";
import XXHash from "xxhash";
import XXHashAddon from "xxhash-addon";
import murmurhashNative from "murmurhash-native";
import farmhash from "farmhash";

let hasher;

console.time("Create array of stringified objects");
const arr = [];
for (var i = 0; i < 500000; i++) {
  const millis = new Date().getTime();
  const title =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
  const body = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nec iaculis nunc. Nam id nisl lobortis, imperdiet orci vitae, consequat neque. Sed felis dolor, placerat vitae hendrerit non, facilisis eu lacus. Curabitur elementum euismod sagittis. Nam porta faucibus lorem, ut molestie ex efficitur ac. Curabitur tincidunt erat efficitur, bibendum magna in, molestie neque. Morbi vel consectetur leo. Fusce egestas diam sit amet sapien iaculis placerat. Curabitur posuere sem nunc. Maecenas vehicula turpis elementum nulla feugiat, rhoncus pharetra enim fermentum. Donec eleifend tristique dui quis dapibus. Vivamus tristique non velit at maximus. Curabitur eu feugiat odio. Sed lectus quam, imperdiet sed nulla a, vulputate tempor orci. Phasellus euismod libero tempor ex consectetur rhoncus.

Curabitur a nisi erat. In ut ipsum id nibh blandit feugiat. Fusce quis ultrices ex. Donec ultricies non turpis non bibendum. Mauris id ipsum dictum, facilisis odio quis, lobortis nunc. Etiam vel odio vel odio pharetra pretium. Aliquam laoreet elementum diam, vel scelerisque sapien cursus id. Cras eleifend molestie lectus elementum vestibulum. Donec lectus ligula, elementum feugiat neque sed, facilisis mollis urna. Mauris finibus semper egestas. Sed et posuere nibh, sit amet congue diam. Nam convallis accumsan ex. Suspendisse potenti. Pellentesque venenatis purus sit amet efficitur pharetra. Integer turpis mauris, vulputate non interdum et, rhoncus a ex.

Nam eu ipsum hendrerit, accumsan tortor quis, placerat mi. In ac elit eu purus vulputate laoreet. Morbi sit amet lectus auctor, tincidunt tellus at, bibendum orci. Sed eu ultrices tellus. Aenean lobortis ipsum id sapien vestibulum, aliquam scelerisque ex pretium. Sed bibendum, odio vitae interdum dapibus, turpis sem pharetra enim, vitae sodales risus elit ut ipsum. Morbi eget urna imperdiet lacus consequat auctor volutpat vel justo. Nunc euismod lacinia urna, nec dapibus purus volutpat et. Integer vestibulum velit dui, nec scelerisque diam pharetra sit amet. Nulla vel nulla quis leo interdum ultricies. Nunc at laoreet nibh. Nulla accumsan semper sapien, non dictum lacus rhoncus non. Ut efficitur metus sed ex blandit pharetra.

Morbi rutrum fermentum felis, et placerat mi fermentum sagittis. Proin egestas, lorem hendrerit rhoncus lacinia, nunc dui ultricies tortor, in placerat massa dolor mollis ipsum. Nullam eget mi in dolor venenatis semper eu a tellus. Duis luctus dui a quam bibendum rutrum. Duis varius orci a ultrices rhoncus. Nunc justo urna, varius vel sapien ultricies, tempor convallis sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec at eros sem. Morbi ac enim mollis, facilisis diam in, pellentesque nibh. Quisque sagittis mi a eros molestie, eu luctus risus cursus. Sed in placerat justo, id accumsan quam. In sed interdum mauris.

Sed facilisis quis nunc nec varius. Ut condimentum lectus lectus, quis finibus nunc lacinia sit amet. Cras et dictum mi. Donec accumsan leo ligula, sed efficitur urna gravida ut. Nullam orci mi, viverra id hendrerit quis, volutpat non enim. In augue purus, tincidunt vitae faucibus eget, mattis eget magna. Maecenas a pulvinar urna, non dignissim massa.
`;

  arr.push(
    JSON.stringify({
      Index: i,
      Timestamp: millis,
      Title: title,
      Body: body,
    })
  );
}
console.timeEnd("Create array of stringified objects");

console.time("SHA1");
arr.forEach((item) => {
  hasher = crypto.createHash("sha1");
  hasher.update(item);
  hasher.digest("base64");
});
console.timeEnd("SHA1");

console.time("MD5");
arr.forEach((item) => {
  hasher = crypto.createHash("md5");
  hasher.update(item);
  hasher.digest("base64");
});
console.timeEnd("MD5");

console.time("XXHash 64");
arr.forEach((item) => {
  XXHash.hash64(Buffer.from(item), 0);
});
console.timeEnd("XXHash 64");

console.time("XXH3");
arr.forEach((item) => {
  hasher = new XXHashAddon.XXHash3();
  hasher.update(Buffer.from(item));
  hasher.digest();
});
console.timeEnd("XXH3");

console.time("murmurhash-native 32");
arr.forEach((item) => {
  murmurhashNative.murmurHash(item);
});
console.timeEnd("murmurhash-native 32");

console.time("murmurhash-native 64");
arr.forEach((item) => {
  murmurhashNative.murmurHash64x64(item);
});
console.timeEnd("murmurhash-native 64");

console.time("murmurhash-native 128");
arr.forEach((item) => {
  murmurhashNative.murmurHash128x64(item);
});
console.timeEnd("murmurhash-native 128");

console.time("FarmHash hash64");
arr.forEach((item) => {
  farmhash.hash64(item);
});
console.timeEnd("FarmHash hash64");

console.time("FarmHash fingerprint64");
arr.forEach((item) => {
  farmhash.fingerprint64(item);
});
console.timeEnd("FarmHash fingerprint64");
