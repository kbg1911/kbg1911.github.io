import 'dart:math';

import 'package:flutter/material.dart';
import 'search.dart';
import 'bbs.dart';
import 'write.dart';

import 'class/common.dart';

Bbs_Data a = new Bbs_Data();

void main() {
  a.setData('title', 'content', 'writer');

  runApp(
    const MaterialApp(title: 'basicApp', home: MyApp()),
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
            IconButton(
                onPressed: () {
                  print("search");
                },
                icon: const Icon(Icons.search)),
            IconButton(
                onPressed: () {
                  print("menu");
                },
                icon: const Icon(Icons.menu)),
          ],
        ),
        body: SizedBox(
          width: double.infinity,
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                ItemProductStateful(),
                Bbs(title: a.title, content: a.content, writer: a.writer),
                Divider(
                  height: 10,
                  color: Colors.blue,
                ),
                Bbs(
                  title: '세탁기',
                  content: '모터 수리 완료된 세탁기',
                  writer: 'me',
                ),
                Divider(
                  height: 10,
                  color: Colors.blue,
                ),
                Bbs(
                  title: '전자렌지',
                  content: '하루밖에 안쓴 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라만세',
                  writer: 'me',
                ),
                Divider(
                  height: 10,
                  color: Colors.blue,
                ),
                Bbs(
                  title: '김치냉장고',
                  content: '냉장기능 사용 가능',
                  writer: 'me',
                ),
                Divider(
                  height: 10,
                  color: Colors.blue,
                ),
                Bbs(
                  title: 'TV',
                  content: '65인치 QLED',
                  writer: '나',
                ),
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
                IconButton(
                    onPressed: () {
                      print("home");
                    },
                    icon: const Icon(Icons.home)),
                IconButton(
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => Search()),
                      );
                    },
                    icon: const Icon(Icons.search)),
                IconButton(
                    onPressed: () {
                      print("menu");
                    },
                    icon: const Icon(Icons.menu)),
              ],
            ),
          ),
        ),
        floatingActionButton: FloatingActionButton(
            child: Icon(Icons.add),
            onPressed: () => {
              Navigator.push(
                context, MaterialPageRoute(builder: (context) => Write())
              )
            }
        )
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
