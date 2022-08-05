import 'package:flutter/material.dart';

class Bbs extends StatelessWidget {
  const Bbs({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      color: Colors.blue,
      height: 150,

      child: Row(
        children: const [
          Flexible(
            fit: FlexFit.tight,
            flex: 3,
            child: Image(image: AssetImage('Images/product.jpg')),
          ),
          Flexible(
            fit: FlexFit.tight,
            flex: 7,
            child: Text('hi'),
          ),
        ],
      ),
    );
  }
}