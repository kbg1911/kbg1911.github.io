import 'dart:math';

import 'package:flutter/material.dart';

void main() {
  runApp( MaterialApp(
    title: 'basicApp',
    home:  MyApp()),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Title"),
        actions: [
          IconButton(onPressed: () {
            print("search");
          }, icon: Icon(Icons.search)),
          IconButton(onPressed: () {
            print("menu");
          }, icon: Icon(Icons.menu)),
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
              IconButton(onPressed: () {
                print("home");
              }, icon: Icon(Icons.home)),
              IconButton(onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => MyApp2()),
                );
              }, icon: Icon(Icons.search)),
              IconButton(onPressed: () {
                print("menu");
              }, icon: Icon(Icons.menu)),
            ],
          ),
          color: Color(0xff999999),
        ),
      ),
    );
  }
}

class MyApp2 extends StatelessWidget {
  const MyApp2({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Second Route"),
      ),
      body: Center(
        child: RaisedButton(
          onPressed: () {
            Navigator.pop(context);
          },
          child: Text('Go back!'),
        ),
      ),
    );
  }
}
class ItemProductStful extends StatefulWidget {
  const ItemProductStful({Key? key}) : super(key: key);

  @override
  State<ItemProductStful> createState() => _ItemProductStfulState();
}

class _ItemProductStfulState extends State<ItemProductStful> {
  var textLabel2 = 5;

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
      if(textLabel2 < 99) {
        textLabel2++;
      }

    });
  }
  void onClickNone2() {
    setState(() {
      if(textLabel2 > 0) {
        textLabel2--;
      }

    });
  }
}
