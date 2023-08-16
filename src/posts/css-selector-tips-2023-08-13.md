---
title: CSS 选择器技巧
---

# CSS 选择器技巧

除了常用的类选择器和子代选择器外，CSS 还有许多实用的选择器。

## 相邻选择

相邻选择经常被忽视，它对结构有严格要求，灵活性不高；但在一些场景下，它还是挺方便的，不用再添加一些不必要的类，或者破坏原有结构。

### `~` 选择下一个兄弟元素

```html
<h1>h1</h1>
<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
<h2>h2</h2>
<!-- ⬆️ 将会被选中 -->
<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
```

```css
h1 ~ h2 {
  color: red;
}
```

### `+` 选择下一个**直接相邻**的兄弟元素

```html
<h1>h1</h1>
<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
<!-- ⬆️ 将会被选中 -->
```

```css
h1 + p {
  color: red;
}
```

## 父代选择

类似于 `div > p` 的子代选择很常见，也很好理解，而想实现“父代选择”则比较困难。转变一下思路，借助 `:has()` 就可以轻松实现：

```html
<div>
  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
</div>
```

```css
div:has(p:hover) {
  background-color: red;
}
```

## 排除选择

经常会遇到这种情况：给一排标签添加间距，最左右的则不需要，通常是写成这样：

```css
.label {
  padding-right: 1em;
}

.label:last-child {
  padding-right: 0;
}
```

使用 `:not()`，可以写得更加简洁：

```css
.label:not(:last-child) {
  padding-right: 1em;
}
```

另外，`:not()` 也可以像 `:has()` 那样用在需要父代选择的场景下。

## 特殊选择

```css
[class='^language-'] {
  color: red;
}
```

属性选择器可能是最强大的选择器，对于已经存在特定属性的元素，优先考虑使用属性选择器；另外一个重要优势是，属性选择器支持模糊匹配。
