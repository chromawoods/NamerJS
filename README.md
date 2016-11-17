# NamerJS
NamerJS is a JavaScript for composing name suggestions, like a generator. In short, NamerJS takes an array or name fragments and returns semi-random compositions of these.

## Getting started
For a really simple implementation, have a look at example.html, in which there are just a few fragments, but they are configured in all kinds of ways.

## Instantiation
`var namer = new Namer(fragments, 3);`

Read about fragments below. The `3` defines the max number of fragments in a composed name.

## Fragments
In the instantiation example above, `fragments` is an array of fragment objects. Here's an example:

```javascript
[
  { text: 'Boat', pos: 0 },
  { text: 'Battle', pos: 1 },
  { text: 'Race', pos: 2 }
]
```

Each of the fragments in the list can be configured to appear att one or more positions in a composed name. `text` is obviously the visible name fragment. `pos` defines where the fragment can appear.

`pos` can be configued like this:
* `1` means that the fragment will ONLY appear *exactly at position 1* (which is the first position of the composed name)
* `0` means that the fragment can appear in *ANY* position
* You can also pass an array of positions. `[1, 3]` means that the fragment can appear at positions 1 and 3

## Generate a name
`getName()` will return a name object containing the following properties:
* `fragments`: The fragments that became the source of the composed name
* `fullName`: The human readable string representation of the composed name

So using the example fragments earlier, the possible names are:
* `Boat Race`
* `Battle Boat`
* `Battle Race`
