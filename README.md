#jQuery Action

Include script after the jQuery library.

```html
<script src="/path/to/jquery.cookie.js"></script>
```

HTML

```html
<input id="x">
<input id="y">
<button id="exe">Run</button>
<p id="msg"></p>
```

JavaSctipt

```javascript
$(window).action("calc", "run", function(dto) {
    return $.ajax().success(function() {
        dto.ans = dto.x + " + " + dto.y + " = " + (dto.x + dto.y);
    });
    //return  $.Deferred(function(dfd) {
    //    dfd.reject();
    //});
});

$("#x").action("calc", "init", function(dto) {
    dto.x = $(this).val() - 0 || 0;
});

$("#y").action("calc", "init", function(dto) {
    dto.y = $(this).val() - 0 || 0;
});

$("#msg").action("calc", "done", function(dto) {
    $(this).text(dto.ans);
}).action("calc", "fail", function() {
    $(this).text("fail!");
});

$("#exe").on("click", function() {
    $.action("calc");
});
```
