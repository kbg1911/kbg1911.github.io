import 'dart:html';

import 'package:flutter/material.dart';

class Bbs extends StatelessWidget {
  Bbs({
    Key? key,
    this.title,
    this.content,
    this.writer
  }) : super(key: key);

  var title ;
  var content ;
  var writer ;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(border: Border.all(width: 1, color: Colors.red)),
      width: double.infinity,
      height: 150,
      child: FlatButton (
        child: Row(
          children: [
            Flexible(
                fit: FlexFit.tight,
                flex: 3,
                child: Container (
                  decoration: BoxDecoration(border: Border.all(width: 1, color: Colors.black)),

                  padding: EdgeInsets.all(10),
                  child: Image(image: AssetImage('Images/product.jpg')),
                )
            ),
            Flexible(
              fit: FlexFit.tight,
              flex: 7,
              child: Column(
                children: [
                  Container (
                    decoration: BoxDecoration(border: Border.all(width: 2, color: Colors.black)),
                    height: 30,
                    padding: EdgeInsets.all(5),
                    alignment: Alignment.centerLeft,

                    child: Text(title),
                  ),
                  Expanded (
                      child: Container (
                        decoration: BoxDecoration(border: Border.all(width: 2, color: Colors.black)),
                        padding: EdgeInsets.all(5),
                        alignment: Alignment.topLeft,
                        child: Text(content),
                      )
                  ),

                  Container (
                    height: 20,
                    alignment: Alignment.topRight,
                    color: Colors.yellow,
                    child: Text(writer),
                  ),
                ],
              ),
            ),
          ],
        ), onPressed: () {  
          print("Click"+title);
      },
      )


    );
  }
}