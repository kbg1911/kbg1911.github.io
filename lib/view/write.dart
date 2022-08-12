import 'package:flutter/material.dart';

class Write extends StatelessWidget {
  const Write({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Write"),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Container(
              height: 30,
            ),
            Container(
              child: const TextField(
                decoration: InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: '제목',
                ),
              ),
            ),
            const Divider(
              height: 30,
            ),
            Container(
              child: const TextField(
                keyboardType: TextInputType.multiline,
                minLines: 10,
                maxLines: 10,
                decoration: InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: '내용공간',
                ),
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: BottomAppBar(
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            TextButton (
              onPressed: () {
                print("Save");
                Navigator.pop(context);
              },
              child: const Text('ADD'),
            ),
            TextButton (
              onPressed: () {
                Navigator.pop(context);
              },
              child: const Text('Go back!!!!'),
            ),
          ],
        )
      ),
    );
  }
}
