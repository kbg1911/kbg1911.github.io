import 'package:flutter/material.dart';

class _ItemProductStatefulState extends State<ItemProductStateful> {
  var textLabel2 = 5;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      height: 100,
      child: Row(
        children: [
          IconButton(onPressed: onClickNone1, icon: const Icon(Icons.plus_one)),
          IconButton(
              onPressed: onClickNone2,
              icon: const Icon(Icons.exposure_minus_1)),
          Text(textLabel2.toString()),
        ],
      ),
    );
  }

  void onClickNone1() {
    setState(() {
      if (textLabel2 < 99) {
        textLabel2++;
      }
    });
  }

  void onClickNone2() {
    setState(() {
      if (textLabel2 > 0) {
        textLabel2--;
      }
    });
  }
}
class ItemProductStateful extends StatefulWidget {
const ItemProductStateful({Key? key}) : super(key: key);

@override
State<ItemProductStateful> createState() => _ItemProductStatefulState();
}
