# HTML
## HTML Back 버튼 링크

``` javascript
<a href="javascript:history.back()">Back</a>
```

## HTML Span 넓이 지정

``` html
<span style="display: inline-block; width: 250px;">No</span>
```

## TextArea 줄바꿈 살리기

``` html
<span style="display: inline-block; width: 250px;">No</span>
```

``` css
.content-view {
	white-space: pre-warp;
}
```

- css에 white-space 설정을 추천

### white-space:
- normal : 기본값. 여러공백 하나, \n은 무시 긴행은 warp
- nowarp : nomal 속성 + 긴행은 warp 안됨
- pre : 여러공백, 개행문자 표현, warp 되지않음
- pre-line : 여러개의 공백은 하나로 표시, 긴행은 필요시 warp, 개행문자 O
- pre-warp : 여러개 공백과 개행문자, 필요시 warp 까지가능

- [참고](https://offbyone.tistory.com/326)
