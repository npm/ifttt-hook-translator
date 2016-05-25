# ifttt-hook-translator

Translate webhooks to maker channel iftt requests!!

webhook package changes to IFTTT. trigger any action supported by IFTTT


## example


create a new recipe that posts npm webhook changes to your slack!

![result](./result.png)


after you complete the first time setup all you need to do to is add hooks with this server as the endpoint (example running on http://ifttt.npmjs.com )


### FIRST TIME SETUP

make your own recipe!

1. login and create and account on https://ifttt.com

2. visit https://ifttt.com/maker click "connect" button

  ![connect maker](./step10.png)

3. copy your maker key  

  ![maker key](./step11.png)

4. create the recipe! visit https://ifttt.com/myrecipes/personal/new

  ![new recipe](./step1.png)

5. click "that" and search for "maker". click the M logo

  ![search maker](./step2.png)

6. click the "Make web request" link

  ![make request](./step3.png)

7. fill in "Event Name" field with "package"

  ![event name](./step4.png)

8. click "That"

  ![that](./step5.png)

9. search for "slack". connect to slack. and click "post to channel"

  ![slack](./step6.png)

10. fill out the form. 

  ![slack form](./step7.png)


### add a hook to a package/scope/or author

wombat! open your terminal and run 

```
wombat hooks add <your scope or package> 'http://ifttt.npmjs.com/hooks?makerKey=<your key from step 3>&event=package' a-secret-does-not-matter
```
