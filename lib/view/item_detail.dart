import 'package:flutter/material.dart';

class ItemDetail extends StatelessWidget {
  var title, content, writer;

  ItemDetail({
    Key? key,
    this.title,
    this.content,
    this.writer
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Container (
        width: double.infinity,
        alignment: Alignment.topLeft,
        decoration: BoxDecoration(border: Border.all(width: 1)),
        child: Column (
          children: [
            Container(
              width: double.infinity,
              alignment: Alignment.topCenter,
              decoration: BoxDecoration(border: Border.all(width: 1)),
              child: Text(title),
            ),
            Flexible(
              fit: FlexFit.tight,
              flex: 1,
              child: Container(
                alignment: Alignment.topLeft,
                width: double.infinity,
                child: Text(content)
              )
            ),
            Container(
              width: double.infinity,
              alignment: Alignment.topRight,
              decoration: BoxDecoration(border: Border.all(width: 1)),
              child: Text(writer),
            ),
          ],
        ),
      ),
    );
  }
}
