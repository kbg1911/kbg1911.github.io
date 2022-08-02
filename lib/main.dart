import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text("Title"),
        ),
        body: Container(
          child: ItemProduct(),
        ),
        bottomNavigationBar: Container(
          height: 50,
          child: BottomAppBar(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                Icon(Icons.home),
                Icon(Icons.favorite),
                Icon(Icons.menu),
              ],
            ),
            color: Color(0xff999999),
          ),
        ),
      )
    );
  }
}

class ItemProduct extends StatelessWidget {
  const ItemProduct({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Text("ItemProduct"),
    );
  }
}
