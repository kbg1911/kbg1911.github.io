import 'dart:math';

import 'package:flutter/material.dart';
import 'search.dart';
import 'bbs.dart';

void main() {
  runApp( const MaterialApp(
    title: 'basicApp',
    home:  MyApp()),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Title"),
        actions: [
          IconButton(onPressed: () {
            print("search");
          }, icon: const Icon(Icons.search)),
          IconButton(onPressed: () {
            print("menu");
          }, icon: const Icon(Icons.menu)),
        ],
      ),
      body: SizedBox(
        width: double.infinity,
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              ItemProductStateful(),
              Bbs(title: 'title1', content: 'hi', writer: 'me',),
              Bbs(title: 'title2', content: 'hi', writer: 'me',),
              Bbs(title: 'title3', content: 'hi', writer: 'me',),
              Bbs(title: 'title4', content: 'hi', writer: 'me',),
              Bbs(title: '한글은', content: '잘되나?', writer: '나',),
            ],
          ),
        ),
      ),
      bottomNavigationBar: SizedBox(
        height: 50,
        child: BottomAppBar(
          color: const Color(0xff999999),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              IconButton(onPressed: () {
                print("home");
              }, icon: const Icon(Icons.home)),
              IconButton(onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => Search()),
                );
              }, icon: const Icon(Icons.search)),
              IconButton(onPressed: () {
                print("menu");
              }, icon: const Icon(Icons.menu)),
            ],
          ),
        ),
      ),
    );
  }
}



class ItemProductStateful extends StatefulWidget {
  const ItemProductStateful({Key? key}) : super(key: key);

  @override
  State<ItemProductStateful> createState() => _ItemProductStatefulState();
}

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
