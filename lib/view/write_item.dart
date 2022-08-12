import 'package:flutter/material.dart';
class WriteItem extends StatefulWidget {
  const WriteItem({Key? key}) : super(key: key);

  @override
  State<WriteItem> createState() => _WriteItemState();
}

class _WriteItemState extends State<WriteItem> {
  late String text;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Container(
        child: TextField(
          onChanged: (value) => {
            text = value,
            print(value),
            print(text)
          },
        ),

      ),

    );
  }
}