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
              child: Center(child: Text('writeSomethings..')),
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
