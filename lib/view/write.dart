import 'package:flutter/material.dart';

class Write extends StatelessWidget {
  const Write({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Write"),
      ),
      body: Container(
        child: Column(
          children: [
            Container(
              height: 300,
              child: Container(
                child: Column(
                  children: [
                    Container(
                      child: TextField(
                        decoration: InputDecoration(
                          border: OutlineInputBorder(),
                          labelText: '제목',
                        ),
                      ),
                    ),
                    Divider(
                      height: 30,
                    ),
                    Expanded(
                      child: TextField(
                        decoration: InputDecoration(
                          border: OutlineInputBorder(),
                          labelText: '내용공간',
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            Container(
              child: TextButton (
                onPressed: () {
                  Navigator.pop(context);
                },
                child: const Text('Go back!!!!'),
              )
            ),
          ],
        ),
      ),
      bottomNavigationBar: BottomAppBar(
        child: TextButton (
          onPressed: () {
            Navigator.pop(context);
          },
          child: const Text('Go back!!!!'),
        )
      ),
    );
  }
}
