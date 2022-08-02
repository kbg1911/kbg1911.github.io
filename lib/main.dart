import 'dart:math';

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
          title: const Text("Title"),
          actions: [
            IconButton(onPressed: onClickNone, icon: Icon(Icons.search)),
            IconButton(onPressed: onClickNone, icon: Icon(Icons.menu)),

          ],
        ),
        body: Container(
          width: double.infinity,
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                ItemProductStful(),
                ItemProductStful(),
                ItemProductStful(),
                ItemProductStful(),
                ItemProductStful(),
                ItemProductStful(),
                ItemProductStful(),
                ItemProductStful(),
                ItemProductStful(),
                ItemProductStful(),
                ItemProductStful(),
                ItemProductStful(),
              ],
            ),
          ),
        ),
        bottomNavigationBar: Container(
          height: 50,
          child: BottomAppBar(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                IconButton(onPressed: onClickNone, icon: Icon(Icons.home)),
                IconButton(onPressed: onClickNone, icon: Icon(Icons.search)),
                IconButton(onPressed: onClickNone, icon: Icon(Icons.menu)),
              ],
            ),
            color: Color(0xff999999),
          ),
        ),
      )
    );
  }
}

void onClickNone() {
  print("onClickNone");
}

class ItemProductStful extends StatefulWidget {
  const ItemProductStful({Key? key}) : super(key: key);

  @override
  State<ItemProductStful> createState() => _ItemProductStfulState();
}

class _ItemProductStfulState extends State<ItemProductStful> {
  var textLabel2 = 100;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      height: 100,
      child: Row(
        children: [
          IconButton(onPressed: onClickNone1, icon: const Icon(Icons.plus_one)),
          IconButton(onPressed: onClickNone2, icon: const Icon(Icons.exposure_minus_1)),
          Text(textLabel2.toString()),
        ],
      ),
    );
  }

  void onClickNone1() {
    setState(() {
      textLabel2++;
    });
  }
  void onClickNone2() {
    setState(() {
      textLabel2--;
    });
  }
}
