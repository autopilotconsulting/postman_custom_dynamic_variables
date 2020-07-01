# Postman Custom Dynamic Variables

This is just an initial commit to keep these somewhere until I decide to do something useful *(please don't judge me)*.  I'd like to make some very obvious improvements:

* I'd like to use typescript because I love it.
* I'd also like to have tests . . . that should be pretty easy.
* I'd like more helpful functions
* I'd like to find a better way to differentiate tokens
* I probably need a better delimiter than `_`
* Might be worth setting values for tokens outside of the body too

The tokens have to be differentiated somehow if you want the values to be different.  I haven't decided on a uniform way.  One way I did it is to have an extra argument at the end that gets ignored like in these examples:
```javascript
{
    "currentPositionX": {{randomFloat_0_100_1}},
    "currentPositionY": {{randomFloat_0_100_2}},
}
```

Here are examples of the existing methods you can call:

```javascript
{
    "selectRandomValue": "{{sample_089c3ace-75e5-43e9-9f66-b7c3e7b87132_6794B2BE-3B4D-4FDF-8B20-12E0342D673F_4A373BFF-1FFA-4076-8339-60C56B0CF158}}",
    "randomIntegerBetween0And5": {{randomInteger_0_5_1}},
    "randomFloatBetween0And100": {{randomFloat_0_100_1}},
}
```

If anybody happens across this little repo, I hope you find this useful.  Feel free to use it however you wish.  Also, feel free to contribute to it if you'd like!

I use this script in collections so they'll apply to all requests in that collection.
