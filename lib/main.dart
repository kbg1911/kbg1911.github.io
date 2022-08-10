import 'package:flutter/material.dart';
import 'search.dart';
import 'bbs.dart';
import 'write.dart';

import 'class/common.dart';

List itemList = <Bbs_Data>[];

void main() {
  itemList.add(Bbs_Data('title','content','writer'));
  itemList.add(Bbs_Data('제목','내용','글쓴이'));
  itemList.add(Bbs_Data('냉장고','한번만씀','강님'));
  itemList.add(Bbs_Data('맥북','공짜로드림','백님'));
  itemList.add(Bbs_Data('고양이','꾹꾹이','윤님'));

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
                for(int i = 0; i < itemList.length; i++)...[
                  Bbs(title: itemList[i].title, content: itemList[i].content, writer: itemList[i].writer),
                  if( i != itemList.length-1) const Divider( height: 10, thickness: 1, color: Colors.blue),
                ],
                const ItemProductStateful(),
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
