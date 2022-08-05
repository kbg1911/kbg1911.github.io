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
      width: double.infinity,
      color: Colors.blue,
      height: 150,

      child: Row(
        children: [
          Flexible(
            fit: FlexFit.tight,
            flex: 3,
            child: Container (
              decoration: BoxDecoration(border: Border.all(width: 2, color: Colors.black)),

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
                  alignment: Alignment.center,

                  child: Text(title),
                ),
                Container (
                  decoration: BoxDecoration(border: Border.all(width: 2, color: Colors.black)),
                  height: 100,
                  alignment: Alignment.topLeft,
                  child: Text(content),
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
      ),
    );
  }
}