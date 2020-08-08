# Node.JS Hash Testing

A simple repo to test the performance of various non-cryptographic hashing algirithms on NPM.

This was created as a test to evaluate the performance of different hashing algorithms when `JSON.stringify`ed emails.

The current algorithms tested:
- SHA1 (built-in)
- MD5 (built-in)
- XXHash64 (xxhash)
- XXH3 (xxhash-addon)
- MurmurHash32 (murmurhash-native)
- MurmurHash64 (murmurhash-native)
- MurmurHash128 (murmurhash-native)
- FarmHash hash64 (farmhash)
- FarmHash fingerprint64 (farmhash)

Inspired by [joliss/fast-js-hash-benchmark](https://github.com/joliss/fast-js-hash-benchmark)

Results can be found in [results.log](./results.log)