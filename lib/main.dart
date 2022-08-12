import 'package:flutter/material.dart';
import 'package:gitpage/view/write_item.dart';
import 'class/ItemProductStatefulState.dart';
import 'view/search.dart';
import 'widgets/bbs.dart';
import 'view/write.dart';

import 'class/common.dart';

List itemList = <Bbs_Data>[];

void main() {
  itemList.add(Bbs_Data('냉장고','한번만씀','강님'));
  itemList.add(Bbs_Data('맥북','공짜로드림','백님'));
  itemList.add(Bbs_Data('고양이','꾹꾹이','윤님'));
  itemList.add(Bbs_Data('건강이최고','건강 잘 챙기세요','국님'));
  itemList.add(Bbs_Data('기타','등등','강님'));
  itemList.add(Bbs_Data('기타','등등','강님'));
  itemList.add(Bbs_Data('기타','등등','강님'));

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
            child: const Icon(Icons.add),
            onPressed: () => {
              Navigator.push(
                context, MaterialPageRoute(builder: (context) => WriteItem())
              )
            }
        )
    );
  }
}


