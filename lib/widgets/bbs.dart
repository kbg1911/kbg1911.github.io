import 'package:flutter/material.dart';

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
            Flexible(
                fit: FlexFit.tight,
                flex: 3,
                child: Container (
                  decoration: BoxDecoration(border: Border.all(width: 1, color: Colors.black)),

                  padding: const EdgeInsets.all(10),
                  child: const Image(image: AssetImage('assets/images/product.jpg')),
                )
            ),
            Flexible(
              fit: FlexFit.tight,
              flex: 7,
              child: Column(
                children: [
                  Container (
                    decoration: BoxDecoration(border: Border.all(width: 2, color: Colors.black)),
                    height: 35,
                    padding: const EdgeInsets.all(5),
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
                    alignment: Alignment.centerRight,
                    color: Colors.yellow,
                    child: Text(writer),

                  ),
                ],
              ),
            ),
          ],
        ),
        onPressed: () {
          print("Click"+title);
        },
      )


    );
  }
}