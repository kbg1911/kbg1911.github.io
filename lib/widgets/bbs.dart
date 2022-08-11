import 'package:flutter/material.dart';
import 'package:gitpage/view/item_detail.dart';

class Bbs extends StatelessWidget {
  var title ;
  var content ;
  var writer ;

  Bbs({
    Key? key,
    this.title,
    this.content,
    this.writer
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(border: Border.all(width: 1, color: Colors.red)),
      width: double.infinity,
      height: 150,
      child: TextButton (
        child: Row(
          children: [
            Flexible( // 이미지 표시영역
                fit: FlexFit.tight,
                flex: 3,
                child: Container (
                  decoration: BoxDecoration(border: Border.all(width: 1, color: Colors.black),color: Colors.yellow),
                  alignment: Alignment.center,
                  padding: const EdgeInsets.all(5),
                  child: const Image(image: AssetImage('assets/images/product.jpg')),
                )
            ),
            Flexible(
              fit: FlexFit.tight,
              flex: 7,
              child: Column(
                children: [
                  Container (
                    decoration: BoxDecoration(border: Border.all(width: 1, color: Colors.black)),
                    height: 35,
                    padding: const EdgeInsets.all(5),
                    alignment: Alignment.centerLeft,

                    child: Text(title),
                  ),
                  Expanded (
                      child: Container (
                        decoration: BoxDecoration(border: Border.all(width: 1, color: Colors.black)),
                        padding: EdgeInsets.all(5),
                        alignment: Alignment.topLeft,
                        child: Text(content),
                      )
                  ),

                  Container (
                    height: 20,
                    decoration: BoxDecoration(border: Border.all(width: 1, color: Colors.black)),
                    alignment: Alignment.centerRight,
                    child: Text(writer),

                  ),
                ],
              ),
            ),
          ],
        ),
        onPressed: () {
          Navigator.push(
              context, MaterialPageRoute(builder: (context) => ItemDetail(
              title: title, content: content, writer: writer
              ))
          );
        },
      )


    );
  }
}