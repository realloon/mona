---
title: CSS 选择器技巧
date: 2023-08-13
---

# CSS 选择器技巧

除了常用的类选择器和子代选择器外，还有许多实用的选法。

## 相邻选择

### `~` 选择下一个兄弟元素

```html
<h1>h1</h1>
<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
<h2>h2</h2>
<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
```

```css
h1 ~ h2 {
  color: red;
}
```

### `+` 选择下一个直接相邻兄弟元素

```html
<h1>h1</h1>
<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
```

```css
h1 + p {
  color: red;
}
```

## 父代选择

`:has()`

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

`:not()`

```html
<div>
  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
</div>
```

```css
p:not(:last-child) {
  color: red;
}
```

## 特殊选择

`[data-<var>key</var>="<var>value</var>"]`

```css
p[data-type='title'] {
  color: red;
}
```
