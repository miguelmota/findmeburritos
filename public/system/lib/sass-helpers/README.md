# Sass Helpers

Some [Sass](http://sass-lang.com/) helper mixins I use

## Install

Available via [bower](http://bower.io/)

```
bower install sass-helpers
```

## Mixins

### respond-to((mobile | tablet | desktop)) { @content }

```css
@include repond-to(mobile) {
    color: black;
}
```

### vendor-prefix(property, value)

```css
@include vendor-prefix(border-radius, 5px)
```

### placeholder { @content }

```css
@include placeholder {
    color: black;
}
```

### ellipsis(font-size, line-height, lines-to-show)

```css
@include ellipsis(18px, 1.2, 3)
```

### triangle(size, color, direction, trim, transparent)

```css
@include triangle(24px, black, up, false, false);
```

## License

Released under the MIT License.
