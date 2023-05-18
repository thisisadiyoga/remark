layout: true
class: basic, layout, imaging, fonts, lists, cards, fadein, tabler
name: content
<div class="basic header"></div>
<div class="basic footer"><p>Remark + Plugins -- Adi Yoga Sidi Prabawa</p></div>

---

name: Remark:_Plugin_Systems
class: bottom, titles

# Remark: Plugin Systems
## Overview

---

name: Preliminary
class: middle, sections

# Preliminary

---

# Preliminary

.ft15.subsections[
### remark.js
]
.ft82[
## remark.js
> [remark.js](https://remarkjs.com/#1) is a simple, in-browser, markdown-driven slideshow tool. You should visit their [github](https://github.com/gnab/remark) page.

### Limitations of remark.js
- Currently, remark.js is lacking ceratin features that may simplify teaching
- Here, we will show some "plugins" that I made for remark.js
.ft50[
- Canvas drawing .note18[(qanvas)]
- Code block .note18[(coder)]
- iFrame sidebar .note18[(itools)]
- Live quiz .note18[(quizzes, with [polleverywhere](https://www.polleverywhere.com/))]
- Table of content .note18[(toc)]
- Section link .note18[(section)]
]
.ft50[
- Automatic tooltop .note18[(tooltip)]
- Simple interactive animation .note18[(anims)]
- Tabular highlight .note18[(tabular)]
- Simple slideshow player .note18[(player)]
- Clickable notes .note18[(notable)]
]

<br><br><br><br><br>

### Fork
A fork of remark.js with plugin system is available on my [github](https://github.com/thisisadiyoga/remark/tree/plugins)
]

---

# Preliminary

.ft15.subsections[
### remark.js
### Plugin
]
.ft82[
## Plugin System
### Primitive
The plugin system is quite "primitive" .note18[(I'm not an expert at this)]
- I added a function `remark.register(func)` into remark.js code
- Once the slide is initialised, all registered plugins callback are invoked

.card.bg-r[
##### Warning
.content.tight[
Only add plugins that you trust to be safe!
]
]
]

---

# Preliminary

.ft15.subsections[
### remark.js
### Plugin
### Template
]
.ft82[
## Template
### Download
- You can download the template [here](https://www.comp.nus.edu.sg/~adi-yoga/remark/file/template.tar)

#### Starting Your Own Slide
- The slide uses `.md` file as a source
- You will need a http server, easiest is to use python
    - Go to the template folder
    - Run `python -m http.server` starting from the folder
    - Connect to `localhost:8000/template.html`
- Modify `md/template.md` to start writing your slide

#### Adding More Slide
- Duplicate `template/html` and `md/template.md`
- Name them with the name of your choide
- Modify line 59 to the correct `.md` file
]

---

name: Qanvas
class: middle, sections

# Qanvas

---

# Qanvas

.ft15.subsections[
### Motivation
]
.ft82[
## Motivation
### Limitation
- remark.js uses HTML to display slides
- Web-browsers has no drawing tools

#### Solution #1
- Print the slide as pdf
- Draw on pdf application

#### Solution #2
- Use HTML `<canvas>`
]

---

# Qanvas

.ft15.subsections[
### Motivation
### Plugin
#### Automatic
]
.ft82[
## Qanvas Plugin
### Automatic
#### Method #1
- Add the following to your HTML
```html
<script
​ src="https://www.comp.nus.edu.sg/~adi-yoga/plugins/qanvas/init.js"
​ type="text/javascript"></script>
```

#### Method #2
- Add the following to remark setting
```js
base: "https://www.comp.nus.edu.sg/~adi-yoga/"
```
- Add the following to your HTML
```html
<script src="plugins/qanvas/init.js" type="text/javascript"></script>
```
]

---

# Qanvas

.ft15.subsections[
### Motivation
### Plugin
#### Automatic
#### Manual
]
.ft82[
## Qanvas Plugin
### Manual
#### Steps
1. Download the qanvas plugin
2. Create the `plugins` directory
3. Copy `plugins/canvas` into your plugin directory
4. Add the following into your HTML
```html
<script src="plugins/qanvas/init.js" type="text/javascript"></script>
```
]

---

# Qanvas

.ft15.subsections[
### Motivation
### Plugin
### Features
]
.ft82[
## Qanvas Features
### Basic Feature
- The qanvas plugin creates 2 `<canvas>` element on each slide
    - `penCanvas` .note18[(pencil drawing with 100% opacity)]
    - `highlighterCanvas` .note18[(highlight content with 30% opacity)]
- Canvas is always active
    - The drawing remains on the slide even if you move to another slide
- Simply click on <i class="fa-solid fa-square-pen"></i> to start drawing
    - Click on <i class="fa fa-pencil"></i> to draw
    - Click on <i class="fa-solid fa-highlighter"></i> to highlight content
    - Click on <i class="fa-solid fa-eraser"></i> to erase pixels .note18[(you can also use right-click to quickly erase something)]
    - Click on <i class="fa fa-pen-fancy"></i> for laser pointer .note18[(no drawing capability)]
    - Click on <i class="fa-solid fa-trash-can"></i> to remove all drawings from the given slide
- Currently I only add 5 colours, this may change in the future with the addition of colour picker
]

---

# Qanvas

.ft15.subsections[
### Motivation
### Plugin
### Features
### Buttons
]
.ft82[
## Buttons
.ft7[
- <i class="fa-solid fa-square-pen"></i><br><br>
- <i class="fa fa-pencil"></i>
- <i class="fa-solid fa-highlighter"></i>
- <i class="fa-solid fa-eraser"></i>
- <i class="fa fa-pen-fancy"></i><br><br>
- <i class="fa-solid fa-square" style="color: rgb(17, 17, 17);"></i>
- <i class="fa-solid fa-square" style="color: rgb(254, 39, 18);"></i>
- <i class="fa-solid fa-square" style="color: rgb(85, 158, 84);"></i>
- <i class="fa-solid fa-square" style="color: rgb(2, 71, 254);"></i>
- <i class="fa-solid fa-square" style="color: rgb(254, 254, 51);"></i><br><br>
- <i class="fa-solid fa-trash-can"></i>
]
.ft93.nol.unindent[
- Start/stop tools<br><br>
- Pencil tool
- Highlighter tool
- Eraser tool .note18[(erase both pencil and highlighter)]
- Laser pointer<br><br>
- Black colour
- Red colour
- Green colour
- Blue colour
- Yellow colour .note18[(mainly for highlighter)]<br><br>
- Remove all drawings on the current slide
]
]

---

# Qanvas

.ft15.subsections[
### Motivation
### Plugin
### Features
### Buttons
### Customisation
]
.ft82[
## Customisation
### Options
- You can quickly customise the qanvas plugin with 2 options
    1. __Size__: specifies the size of the icons
        - `"small"` .note18[(16px)], `"medium"` .note18[(20px, default)], `"large"` .note18[(24px)]
        - You can also customise the css file directly
    2. __Layout__: specifies the orientation of buttons
        - "vertical" .note18[(vertical orientation)], "horizontal" .note18[(horizontal orientation)]
        - Buttons are always available at bottom-left corner

#### Example
```js
qanvas: {
  size: 'small',
  layout: 'vertical'
}
```
]

---

name: Coder
class: middle, sections

# Coder

---

# Coder

.ft15.subsections[
### Motivation
]
.ft82[
## Motivation
### Limitation
- No copy button <i class="fa fa-copy"></i>
- Code should be more than static

#### Solution
- Highlight certain lines .note18[(lite/lites)]
- Emphasis important lines by setting opacity of other areas to 20% .note18[(emph/emphs)]
- Step-by-step visualisation .note18[(step/steps)]
- Hide long codes to fit on slide .note18[(show)]
]

---

# Coder

.ft15.subsections[
### Motivation
### Plugin
#### Automatic
]
.ft82[
## Coder Plugin
### Automatic
#### Method #1
- Add the following to your HTML
```html
<script
​ src="https://www.comp.nus.edu.sg/~adi-yoga/plugins/coder/init.js"
​ type="text/javascript"></script>
```

#### Method #2
- Add the following to remark setting
```js
base: "https://www.comp.nus.edu.sg/~adi-yoga/"
```
- Add the following to your HTML
```html
<script src="plugins/coder/init.js" type="text/javascript"></script>
```
]

---

# Coder

.ft15.subsections[
### Motivation
### Plugin
#### Automatic
#### Manual
]
.ft82[
## Coder Plugin
### Manual
#### Steps
1. Download the coder plugin
2. Create the `plugins` directory
3. Copy `plugins/coder` into your plugin directory
4. Add the following into your HTML
```html
<script src="plugins/coder/init.js" type="text/javascript"></script>
```
]

---

# Coder

.ft15.subsections[
### Motivation
### Plugin
### Features
#### Copy
]
.ft82[
## Coder Features
### Automatic Copy Button
- A copy button <i class="fa fa-copy"></i> is automatically added to any code block .note18[(i.e., triple backtick ```)]
    - Unless specified otherwise with `copy=nones`
    - Limited preprocessing can be specified
    - Some zero-width characters are removed

#### Automatic
.col51[
##### Display
```jshell
jshell> int x = 2;
x ==> 2
```
- No preprocessing
- Try pressing <i class="fa fa-copy"></i> and paste on the textarea on the right
]
.ft49[
##### Code
````text
```jshell
jshell> int x = 2;
x ==> 2
```
````
<textarea class="font20" style="width:100%; height: 100px"></textarea>
]
]

---

# Coder

.ft15.subsections[
### Motivation
### Plugin
### Features
#### Copy
]
.ft82[
## Coder Features
### Automatic Copy Button
- A copy button <i class="fa fa-copy"></i> is automatically added to any code block .note18[(i.e., triple backtick ```)]
    - Unless specified otherwise with `copy=nones`
    - Limited preprocessing can be specified
    - Some zero-width characters are removed

#### Shell
.col51[
##### Display
```jshell[copy=shell]
jshell> int x = 2;
x ==> 2
```
- Remove the shell "meta" symbol, output, and comment
]
.ft49[
##### Code
````text
```jshell[copy=shell]
jshell> int x = 2;
x ==> 2
```
````
<textarea class="font20" style="width:100%; height: 100px"></textarea>
]
]

---

# Coder

.ft15.subsections[
### Motivation
### Plugin
### Features
#### Copy
]
.ft82[
## Coder Features
### Automatic Copy Button
- A copy button <i class="fa fa-copy"></i> is automatically added to any code block .note18[(i.e., triple backtick ```)]
    - Unless specified otherwise with `copy=nones`
    - Limited preprocessing can be specified
    - Some zero-width characters are removed

#### Print
.col51[
##### Display
```pythoprepl[copy=print]
>>> 2 # 2
2
```
- Remove the shell "meta" symbol, output, and comment
- Wrap each line in a `print(...)`
]
.ft49[
##### Code
````text
```pythoprepl[copy=print]
>>> 2 # 2
2
```
````
<textarea class="font20" style="width:100%; height: 100px"></textarea>
]
]

---

# Coder

.ft15.subsections[
### Motivation
### Plugin
### Features
#### Copy
]
.ft82[
## Coder Features
### Automatic Copy Button
- A copy button <i class="fa fa-copy"></i> is automatically added to any code block .note18[(i.e., triple backtick ```)]
    - Unless specified otherwise with `copy=nones`
    - Limited preprocessing can be specified
    - Some zero-width characters are removed

#### Codes
.col51[
##### Display
```pythoprepl[copy=codes]
>>> 2 # 2
2
```
- Remove the shell "meta" symbol, and output
]
.ft49[
##### Code
````text
```pythoprepl[copy=print]
>>> 2 # 2
2
```
````
<textarea class="font20" style="width:100%; height: 100px"></textarea>
]
]

---

# Coder

.ft15.subsections[
### Motivation
### Plugin
### Features
#### Copy
]
.ft82[
## Coder Features
### Automatic Copy Button
- A copy button <i class="fa fa-copy"></i> is automatically added to any code block .note18[(i.e., triple backtick ```)]
    - Unless specified otherwise with `copy=nones`
    - Limited preprocessing can be specified
    - Some zero-width characters are removed

#### No Copy
.col51[
##### Display
```pythoprepl[copy=nones]
>>> 2 # 2
2
```
- No copy button <i class="fa fa-copy"></i> is added
- Need to copy manually
]
.ft49[
##### Code
````text
```pythoprepl[copy=print]
>>> 2 # 2
2
```
````
<textarea class="font20" style="width:100%; height: 100px"></textarea>
]
]

---

# Coder

.ft15.subsections[
### Motivation
### Plugin
### Features
#### Copy
#### File
]
.ft82[
## Coder Features
### File Download
- If a name is specified, a bar with the filename <i class="fa fa-file-code"></i> is created at the top of the code that can be downloaded when pressed

#### Example
.col51[
##### Display
```python[name=isPrime.py]
def isPrime(n):
  for i in range(2,n):
    if n%i == 0:
      return False
  return True
```
]
.ft49[
##### Code
````text
```python[name=isPrime.py]
def isPrime(n):
  for i in range(2,n):
    if n%i == 0:
      return False
  return True
```
````
]
]

---

# Coder

.ft15.subsections[
### Motivation
### Plugin
### Features
#### Copy
#### File
#### Single
]
.ft82[
## Coder Features
### Single Step Annotation
- Used to emphasise, highlight, .note18[etc] code blocks without step

#### Specification
- Specify the line by either
    - Single line number .note18[(e.g., 11)]
    - Range of line numbers .note18[(e.g., 2-6)]
    - Comma separated line numbers .note18[(e.g., 2,4,19)]
- Duplicates are removed

##### Syntax
`[command=<lines>]` where `command` are
- `emph` .note18[(emphasise, put opacity of other codes at 20% as specified in `.remark-code-unhighlighted`)]
- `lite` .note18[(highlight, yellow colour as specified in `.remark-code-hilite`)]
- `step` .note18[(step, put opacity of other codes at 0% as specified in `.remark-code-hidden`)]
- `show` .note18[(show/hide, set display as `none` for other codes)]
]

---

# Coder

.ft15.subsections[
### Motivation
### Plugin
### Features
#### Copy
#### File
#### Single
]
.ft82[
## Coder Features
### Single Step Annotation
- Used to emphasise, highlight, .note18[etc] code blocks without step

#### Emphasis
.col51[
##### Display
```py[emph=2-4]
def isPrime(n):
  for i in range(2,n):
    if n%i == 0:
      return False
  return True
```
]
.ft49[
##### Code
````text
```py[emph=2-4]
def isPrime(n):
  for i in range(2,n):
    if n%i == 0:
      return False
  return True
```
````
]
]

---

# Coder

.ft15.subsections[
### Motivation
### Plugin
### Features
#### Copy
#### File
#### Single
]
.ft82[
## Coder Features
### Single Step Annotation
- Used to emphasise, highlight, .note18[etc] code blocks without step

#### Highlight
.col51[
##### Display
```py[lite=1-3,5]
def isPrime(n):
  for i in range(2,n):
    if n%i == 0:
      return False
  return True
```
]
.ft49[
##### Code
````text
```py[lite=1-3,5]
def isPrime(n):
  for i in range(2,n):
    if n%i == 0:
      return False
  return True
```
````
]
]

---

# Coder

.ft15.subsections[
### Motivation
### Plugin
### Features
#### Copy
#### File
#### Single
]
.ft82[
## Coder Features
### Single Step Annotation
- Used to emphasise, highlight, .note18[etc] code blocks without step

#### Step
.col51[
##### Display
```py[step=3,5]
def isPrime(n):
  for i in range(2,n):
    if n%i == 0:
      return False
  return True
```
]
.ft49[
##### Code
````text
```py[step=3,5]
def isPrime(n):
  for i in range(2,n):
    if n%i == 0:
      return False
  return True
```
````
]
]

---

# Coder

.ft15.subsections[
### Motivation
### Plugin
### Features
#### Copy
#### File
#### Single
]
.ft82[
## Coder Features
### Single Step Annotation
- Used to emphasise, highlight, .note18[etc] code blocks without step

#### Show/Hide
.col51[
##### Display
```py[show=3-7]
def isDiv(x,y):
  return x%y == 0
def isPrime(n):
  for i in range(2,n):
    if isDiv(n,i):
      return False
  return True
```
]
.ft49[
##### Code
````text
```py[show=3-7]
def isDiv(x,y):
  return x%y == 0
def isPrime(n):
  for i in range(2,n):
    if isDiv(n,i):
      return False
  return True
```
````
]
]

---

# Coder

.ft15.subsections[
### Motivation
### Plugin
### Features
#### Copy
#### File
#### Single
#### Multi
]
.ft82[
## Coder Features
### Multi Step Annotation
- Used to emphasise, highlight, .note18[etc] code blocks with steps

#### Specification
- Comments are automatically hidden
    - Can be shown by clicking <i class="fa fa-comment"></i> button
- Dynamically change annotation forward <i class="fa fa-forward-step"></i> and backward <i class="fa fa-backward-step"></i>
    - Quickly go to the end <i class="fa fa-forward-fast"></i> and start <i class="fa fa-backward-fast"></i>
- Final step is always no annotation

##### Syntax
`[command=<lines>;<lines>;<lines>]` where `command` are
- `emphs` .note18[(emphasise, put opacity of other codes at 20% as specified in `.remark-code-unhighlighted`)]
- `lites` .note18[(highlight, yellow colour as specified in `.remark-code-hilite`)]
- `steps` .note18[(step, put opacity of other codes at 0% as specified in `.remark-code-hidden`)]
]

---

# Coder

.ft15.subsections[
### Motivation
### Plugin
### Features
#### Copy
#### File
#### Single
#### Multi
]
.ft82[
## Coder Features
### Multi Step Annotation
- Used to emphasise, highlight, .note18[etc] code blocks with steps

#### Emphasis
.col51[
##### Display
```py[emphs=1-3,5;2-4;1,3,5]
def isPrime(n):
  for i in range(2,n):
    if n%i == 0:
      return False
  return True # need else?
```
]
.ft49[
##### Code
````text
```py[emphs=1-3,5;2-4;1,3,5]
def isPrime(n):
  for i in range(2,n):
    if n%i == 0:
      return False
  return True # need else?
```
````
]
]

---

# Coder

.ft15.subsections[
### Motivation
### Plugin
### Features
#### Copy
#### File
#### Single
#### Multi
]
.ft82[
## Coder Features
### Multi Step Annotation
- Used to emphasise, highlight, .note18[etc] code blocks with steps

#### Highlight
.col51[
##### Display
```py[lites=1-3,5;2-4;1,3,5]
def isPrime(n):
  for i in range(2,n):
    if n%i == 0:
      return False
  return True # need else?
```
]
.ft49[
##### Code
````text
```py[lites=1-3,5;2-4;1,3,5]
def isPrime(n):
  for i in range(2,n):
    if n%i == 0:
      return False
  return True # need else?
```
````
]
]

---

# Coder

.ft15.subsections[
### Motivation
### Plugin
### Features
#### Copy
#### File
#### Single
#### Multi
]
.ft82[
## Coder Features
### Multi Step Annotation
- Used to emphasise, highlight, .note18[etc] code blocks with steps

#### Step
.col51[
##### Display
```py[steps=1-3,5;2-4;1,3,5]
def isPrime(n):
  for i in range(2,n):
    if n%i == 0:
      return False
  return True # need else?
```
]
.ft49[
##### Code
````text
```py[steps=1-3,5;2-4;1,3,5]
def isPrime(n):
  for i in range(2,n):
    if n%i == 0:
      return False
  return True # need else?
```
````
]
]

---

# Coder

.ft15.subsections[
### Motivation
### Plugin
### Features
### Buttons
]
.ft82[
## Buttons
.ft7[
- <i class="fa-solid fa-copy"></i>
- <i class="fa fa-file-code"></i>
]
.ft93.nol.unindent[
- Copy code
- Download code
]

### Multi Step Annotations
.ft7[
- <i class="fa-solid fa-comment"></i>
- <i class="fa-solid fa-backward-fast"></i>
- <i class="fa fa-backward-step"></i>
- <i class="fa-solid fa-forward-step"></i>
- <i class="fa-solid fa-forward-fast"></i>
]
.ft93.nol.unindent[
- Show/hide comment
- Go to beginning
- Step backward
- Step forward
- Go to the end
]
]

---

name: iTools
class: middle, sections

# iTools

---

# iTools

.ft15.subsections[
### Motivation
]
.ft82[
## Motivation
### Limitation
- HTML is good for interactivity but plugins for remark.js can be tedious
    - There are already many useful tools online

#### Solution
- Embed tools as iframe
- Centralised location for iframe elements to avoid distraction on slide content
]

---

# iTools

.ft15.subsections[
### Motivation
### Plugin
#### Automatic
]
.ft82[
## iTools Plugin
### Automatic
#### Method #1
- Add the following to your HTML
```html
<script
​ src="https://www.comp.nus.edu.sg/~adi-yoga/plugins/itools/init.js"
​ type="text/javascript"></script>
```

#### Method #2
- Add the following to remark setting
```js
base: "https://www.comp.nus.edu.sg/~adi-yoga/"
```
- Add the following to your HTML
```html
<script src="plugins/itools/init.js" type="text/javascript"></script>
```
]

---

# iTools

.ft15.subsections[
### Motivation
### Plugin
#### Automatic
#### Manual
]
.ft82[
## iTools Plugin
### Manual
#### Steps
1. Download the itools plugin
2. Create the `plugins` directory
3. Copy `plugins/itools` into your plugin directory
4. Add the following into your HTML
```html
<script src="plugins/itools/init.js" type="text/javascript"></script>
```
]

---

# iTools

.ft15.subsections[
### Motivation
### Plugin
### Features
]
.ft82[
## iTools Features
### Basic Feature
- Click on <i class="fa-solid fa-toolbox"></i> button on the top-right corner to open the iframes
    - Click on it again to close .note18[(alternatively, click anywhere on the slide to close it)]
- Click on <i class="fa-solid fa-repeat"></i> to manually refresh the iframe
- iFrames are added as tabs

#### Register iFrame
- Invoke `window.$itools.add(icon, name, link)` where
    - `icon` is the FontAwesome icon name .note18[(e.g., if the name is `fa-toolbox`, simply put `"toolbox"`)]
    - `name` is the name to be displayed on the tab
    - `link` is the link to the source website
]

---

name: Quizzes
class: middle, sections

# Quizzes

---

# Quizzes

.ft15.subsections[
### Motivation
]
.ft82[
## Motivation
### Limitation
- Interaction with students during lecture requires additional tool
- Inability to revise live quizzes easily

#### Solution
- Use [polleverywhere](https://www.polleverywhere.com/) to record students' answers
    - Mainly because they allow iframe and we have not been able to find a better alternative
- Add buttons for choices with textbox to display some comments on whether the answer is correct or not
- __Warning:__ Our syntax may be horrendous but it allows for a styling without the use of this plugin
]

---

# Quizzes

.ft15.subsections[
### Motivation
### Plugin
#### Automatic
]
.ft82[
## Quizzes Plugin
### Automatic
#### Method #1
- Add the following to your HTML
```html
<script
​ src="https://www.comp.nus.edu.sg/~adi-yoga/plugins/quizzes/init.js"
​ type="text/javascript"></script>
```

#### Method #2
- Add the following to remark setting
```js
base: "https://www.comp.nus.edu.sg/~adi-yoga/"
```
- Add the following to your HTML
```html
<script src="plugins/quizzes/init.js" type="text/javascript"></script>
```
]

---

# Quizzes

.ft15.subsections[
### Motivation
### Plugin
#### Automatic
#### Manual
]
.ft82[
## Quizzes Plugin
### Manual
#### Steps
1. Download the quizzes plugin
2. Create the `plugins` directory
3. Copy `plugins/quizzes` into your plugin directory
4. Add the following into your HTML
```html
<script src="plugins/quizzes/init.js" type="text/javascript"></script>
```
]

---

# Quizzes

.ft15.subsections[
### Motivation
### Plugin
### Features
#### MRQ
]
.ft82[
## Quizzes Features
### MRQ
.qns[
> ##### MRQ
> What plugins have we discussed? .note18[(go to the link shown by the QR on top right, click to enlarge)]
]

.mrq.msize[
1. .quiz-choice[anims] .quiz-ans[0] .quiz-hint[NO: not yet]
2. .quiz-choice[coder] .quiz-ans[1] .quiz-hint[YES: the second]
3. .quiz-choice[itools] .quiz-ans[1] .quiz-hint[YES: the third]
4. .quiz-choice[player] .quiz-ans[0] .quiz-hint[NO: not yet]
5. .quiz-choice[section] .quiz-ans[0] .quiz-hint[NO: not yet]
6. .quiz-choice[tabular] .quiz-ans[0] .quiz-hint[NO: not yet]
7. .quiz-choice[toc] .quiz-ans[0] .quiz-hint[NO: not yet]
8. .quiz-choice[tooltip] .quiz-ans[0] .quiz-hint[NO: not yet]
9. .quiz-choice[qanvas] .quiz-ans[1] .quiz-hint[YES: the first]
10. .quiz-choice[quizzes] .quiz-ans[1] .quiz-hint[YES: it's this one!]

.quizzes-poll[WSJvrsvRMlMeBZsL76jbG]
.quizzes-time[30]
.quizzes-qr[https://www.comp.nus.edu.sg/~adi-yoga/remark/img/QR01.png]
]
]

---

# Quizzes

.ft15.subsections[
### Motivation
### Plugin
### Features
#### MRQ
]
.ft82[
## Quizzes Features
### MRQ

#### Code
```text
.mrq[
  -- this specifies that we are making an mrq
  -- we use ordered list to list the choices
  
  -- we then have other parts
]
```

###### Choices
```text
1. .quiz-choice[<the choice in html>]
   .quiz-ans[<0 for wrong, 1 for correct>]
   .quiz-hint[<the hint to be shown when they press ?>]
```
]

---

# Quizzes

.ft15.subsections[
### Motivation
### Plugin
### Features
#### MRQ
]
.ft82[
## Quizzes Features
### MRQ

#### Code
```text
.mrq[
  -- this specifies that we are making an mrq
  -- we use ordered list to list the choices
  
  -- we then have other parts
]
```

###### Other Parts
```
.quizzes-poll[<polleverywhere embed code>]
.quizzes-time[<countdown timer, click to activate>]
.quizzes-qr[<qr code to the poll page as image>]
```
]

---

# Quizzes

.ft15.subsections[
### Motivation
### Plugin
### Features
#### MRQ
]
.ft82[
## Quizzes Features
### MRQ

#### Code
```text
.mrq[
  -- this specifies that we are making an mrq
  -- we use ordered list to list the choices
  
  -- we then have other parts
]
```

###### Embed Code
- This is poll everywhere [live presentation view embed script](https://support.polleverywhere.com/hc/en-us/articles/1260801821849-Embed-an-activity)

]

---

name: TOC
class: middle, sections

# TOC

---

# TOC

.ft15.subsections[
### Motivation
]
.ft82[
## Motivation
### Limitation
- Slides are often composed of multiple sections
- Linking and navigating between sections are often tedious

#### Solution
- Adds a sidebar for table of contents
    - Automatically added by specifying the correct class name and remark.js slide name for link
    - Must follow the correct format
]

---

# TOC

.ft15.subsections[
### Motivation
### Plugin
#### Automatic
]
.ft82[
## TOC Plugin
### Automatic
#### Method #1
- Add the following to your HTML
```html
<script
​ src="https://www.comp.nus.edu.sg/~adi-yoga/plugins/toc/init.js"
​ type="text/javascript"></script>
```

#### Method #2
- Add the following to remark setting
```js
base: "https://www.comp.nus.edu.sg/~adi-yoga/"
```
- Add the following to your HTML
```html
<script src="plugins/toc/init.js" type="text/javascript"></script>
```
]

---

# TOC

.ft15.subsections[
### Motivation
### Plugin
#### Automatic
#### Manual
]
.ft82[
## TOC Plugin
### Manual
#### Steps
1. Download the toc plugin
2. Create the `plugins` directory
3. Copy `plugins/toc` into your plugin directory
4. Add the following into your HTML
```html
<script src="plugins/toc/init.js" type="text/javascript"></script>
```
]

---

# TOC

.ft15.subsections[
### Motivation
### Plugin
### Features
]
.ft82[
## TOC Features
### Basic Feature
- Click <i class="fa fa-bars"></i> to open the table of content
- Click on the title or sections to navigate to the slide

#### Customisation
- __Multiple Title__ .note18[(`multiTitle`)]: for very large slide
    - `true` .note18[(allows multiple title)], `false` .note18[(keep only the first encountered title, default)]
- __Unique__ .note18[(`unique`)]: to allow/disallow duplicate section
    - `true` .note18[(use the first section for link)], `false` .note18[(allow multiple section, default)]
- __Title__ .note18[(`title`)]: to specify the class name for title
    - Default is `titles`
- __Section__ .note18[(`section`)]: to specify the class name for section
    - Default is `sections`
]

---

# TOC

.ft15.subsections[
### Motivation
### Plugin
### Features
### Format
#### Titles
]
.ft82[
## TOC Format
### Titles
```text
---

name: Title_Link
class: ..., titles

# ...

---
```
- `Title_Link` should be a unique name to link directly to the start of title
    - Underscore .note18[(i.e., `_`)] will be automatically replaced with whitespace
    - This will form the name to be displayed on the table of content
]

---

# TOC

.ft15.subsections[
### Motivation
### Plugin
### Features
### Format
#### Titles
#### Sections
]
.ft82[
## TOC Format
### Titles
```text
---

name: Section_Link
class: ..., sections

# ...

---
```
- `Section_Link` should be a unique name to link directly to the start of section
    - Underscore .note18[(i.e., `_`)] will be automatically replaced with whitespace
    - This will form the name to be displayed on the table of content
]

---

name: Section
class: middle, sections

# Section

---

# Section

.ft15.subsections[
### Motivation
]
.ft82[
## Motivation
### Limitation
- Slides are often composed of multiple sections with each section consists of multiple subsections
- Linking and navigating within subsections are often tedious
- Slides are often written in steps but manually creating subsections requires the slide to first be completed

#### Solution
- Adds a clickable link to the subsection
    - Automatically added by specifying the correct class name
    - Must follow the correct format
- Subsequent subsections are automatically added to previous slides in the same section
    - This allows more incremental changes to be made
    - _Work-in-progress_ to specify only the given subsection
]

---

# Section

.ft15.subsections[
### Motivation
### Plugin
#### Automatic
]
.ft82[
## Section Plugin
### Automatic
#### Method #1
- Add the following to your HTML
```html
<script
​ src="https://www.comp.nus.edu.sg/~adi-yoga/plugins/section/init.js"
​ type="text/javascript"></script>
```

#### Method #2
- Add the following to remark setting
```js
base: "https://www.comp.nus.edu.sg/~adi-yoga/"
```
- Add the following to your HTML
```html
<script src="plugins/section/init.js" type="text/javascript"></script>
```
]

---

# Section

.ft15.subsections[
### Motivation
### Plugin
#### Automatic
#### Manual
]
.ft82[
## Section Plugin
### Manual
#### Steps
1. Download the section plugin
2. Create the `plugins` directory
3. Copy `plugins/section` into your plugin directory
4. Add the following into your HTML
```html
<script src="plugins/section/init.js" type="text/javascript"></script>
```
]

---

# Section

.ft15.subsections[
### Motivation
### Plugin
### Format
]
.ft82[
## Format
- Specify the class name for subsection
    - By default, it will search for `subsections`
- Use `h3` for first-level subsection
- Use `h4` for second-level subsection

### Important
- Keep the previous `h3` and `h4`
- Append the new `h3` and `h4`
- Do not keep `h4` from previous `h3`

#### Example
- The following is used for the current section .note18[(`.ft15` is the formatting to keep the subsection to 15% width, `subsections` is the class to be searched)]

.col51[
```text
.ft15.subsections[
### Motivation
### Plugin
### Format
]
```
]
.ft49[
> Try clicking "Motivation" to jump to the "Motivation" subsection
]
]

---

# Section

.ft15.subsections[
### Motivation
### Plugin
### Format
### Customisation
]
.ft82[
## Customisation
### Options
- You can quickly customise the section plugin with 2 options
    1. __Class Name__: specifies the class name for subsection
        - Default is `"subsections"`
    2. __Prefix__: specifies the prefix to be prepended to the current section
        - Default is `"❱ "`
        - You need to add whitespace at the end if you need one

#### Example
```js
section: {
  sub: 'subsubsection',
  pre: '+ '
}
```
]

---

name: Tooltip
class: middle, sections

# Tooltip

---

# Tooltip

.ft15.subsections[
### Motivation
]
.ft82[
## Motivation
### Limitation
- Some background knowledges are typically assumed for the content
    - But linking to the content may be tedious

#### Solution
- Adds a tooltip on hover for certain .tooltip[concepts~@~like this one]
]

---

# Tooltip

.ft15.subsections[
### Motivation
### Plugin
#### Automatic
]
.ft82[
## Tooltip Plugin
### Automatic
#### Method #1
- Add the following to your HTML
```html
<script
​ src="https://www.comp.nus.edu.sg/~adi-yoga/plugins/tooltip/init.js"
​ type="text/javascript"></script>
```

#### Method #2
- Add the following to remark setting
```js
base: "https://www.comp.nus.edu.sg/~adi-yoga/"
```
- Add the following to your HTML
```html
<script src="plugins/tooltip/init.js" type="text/javascript"></script>
```
]

---

# Tooltip

.ft15.subsections[
### Motivation
### Plugin
#### Automatic
#### Manual
]
.ft82[
## Tooltip Plugin
### Manual
#### Steps
1. Download the tooltip plugin
2. Create the `plugins` directory
3. Copy `plugins/tooltip` into your plugin directory
4. Add the following into your HTML
```html
<script src="plugins/tooltip/init.js" type="text/javascript"></script>
```
]

---

# Tooltip

.ft15.subsections[
### Motivation
### Plugin
### Features
]
.ft82[
## Tooltip Features
### Basic Feature
- We use [cooltipz](https://cooltipz.jackdomleo.dev/) for our style
- Underlined text can be hovered to show more information like .tooltip[this one~@~Isn't it cool?]

#### Format
- Use the `.tooltip` CSS class like the code below
```text
.tooltip[this one~@~Isn't it cool?]
```
    - The default separator between text and content is `~@~`

#### Positition and Size
- Manually specify the position
    - `.tooltip_top` will show the content on .tooltip_top[top~@~Default is right]
    - There are 4 positions: `.tooltip_top`,`.tooltip_right`, `.tooltip_bottom`, and `.tooltip_left`
- Manually specify the size
    - `.tooltip_small` will make the bounding box .tooltip_small[large~@~Default is large]
    - There are 4 sizes: `.tooltip_small`,`.tooltip_medium`, `.tooltip_large`, and `.tooltip_fit`
- You can also mix-and-match like .tooltip_left_medium[`.tooltip_left_medium`~@~On the left, medium size] or .tooltip_large_bottom[`.tooltip_large_bottom`~@~Large size, at the bottom]
]

---

# Tooltip

.ft15.subsections[
### Motivation
### Plugin
### Features
### Customisation
]
.ft82[
## Customisation
### Options
- You can quickly customise the tooltip plugin with 4 options
    1. __Default Position__: specifies the default position for `.tooltip[...]`
        - `"top"`, `"right"` .note18[(default)], `"bottom"`, and `"left"`
    2. __Default Size__: specifies the default size for `.tooltip[...]`
        - `"small"`, `"medium"`, `"large"` .note18[(default)], and `"fit"`
        - `"top"`, `"right"` .note18[(default)], `"bottom"`, and `"left"`
    3. __Separator__: specifies the separator between text and content `.tooltip[text~@~content]`
        - Default is `~@~` because such combination is not used much
    4. __Underline__: specifies if the text with tooltop should be underlined
        - `true` .note18[(default)] or `false`
        
#### Example
```js
tooltip: {
  position: 'top', size: 'small', separator: '~~@~~', underline: false
}
```
]

---

name: Anims
class: middle, sections

# Anims

---

# Anims

.ft15.subsections[
### Motivation
]
.ft82[
## Motivation
### Limitation
- Non-interactive slide is boring
- HTML animation can be tedious

#### Solution
- Provide animation based on CSS class with simplified interaction
    - Click, pointer enter, pointer leave, .note18[etc]
- Allows for specification of anchor .note18[(elements to be interacted)] and targer .note18[(elements to be animated)]
    - Can be the same or different elements
    - Can be chained
]

---

# Anims

.ft15.subsections[
### Motivation
### Plugin
#### Automatic
]
.ft82[
## Anims Plugin
### Automatic
#### Method #1
- Add the following to your HTML
```html
<script
​ src="https://www.comp.nus.edu.sg/~adi-yoga/plugins/anims/init.js"
​ type="text/javascript"></script>
```

#### Method #2
- Add the following to remark setting
```js
base: "https://www.comp.nus.edu.sg/~adi-yoga/"
```
- Add the following to your HTML
```html
<script src="plugins/anims/init.js" type="text/javascript"></script>
```
]

---

# Anims

.ft15.subsections[
### Motivation
### Plugin
#### Automatic
#### Manual
]
.ft82[
## Anims Plugin
### Manual
#### Steps
1. Download the anims plugin
2. Create the `plugins` directory
3. Copy `plugins/anims` into your plugin directory
4. Add the following into your HTML
```html
<script src="plugins/anims/init.js" type="text/javascript"></script>
```
]

---

# Anims

.ft15.subsections[
### Motivation
### Plugin
### Components
#### Preliminary
]
.ft82[
## Anims Components
### Preliminary
- An animation requires 3 components
    1. The anchor to listen to an event
    2. The target to be animated
    3. The tag connecting anchor and target
- Anchor and target can be the same element
- Target of a tag can be an anchor to another tag
- Multiple tags can be used to
    - make a target be animated by two different anchors
    - allow an anchor to animate two different targets
]

---

# Anims

.ft15.subsections[
### Motivation
### Plugin
### Components
#### Preliminary
#### Anchor
]
.ft82[
## Anims Components
### Anchor
.col57[
```js
.anims-anchor[
  .anims-content[
    <your content here>
  ]
  .anims-on[<Event 1>~@~<Event 2>~@~... ]
  .anims-anchor-tag[<Tag 1>~@~<Tag 2>~@~ ... ]
]
```
]
.ft43[
```text[copy=nones]
// Specifies an anchor
// Start of content
​
​
// Listen for these events
// The tag connecting to target
​
```
]
]

---

# Anims

.ft15.subsections[
### Motivation
### Plugin
### Components
#### Preliminary
#### Anchor
#### Target
]
.ft82[
## Anims Components
### Target
.col57[
```js
.anims-target[
  .anims-content[
    <your content here>
  ]
  .anims-cls[<CSS 1>~@~<CSS 2>~@~ ... ]
  .anims-target-tag[<tag 1>~@~<tag 2>~@~ ... ]
]
```
]
.ft43[
```text[copy=nones]
// Specifies a target (apply CSS here)
// Start of content
​
​
// Classes to be toggled
// The tag connecting to anchor
​
```
]
]

---

# Anims

.ft15.subsections[
### Motivation
### Plugin
### Components
### Examples
#### Click
]
.ft82[
## Anims Examples
### Simple Click
- Click on the question card below to reveal the answer ; click again to hide

.col51[
.anims-anchor[
.anims-content[
.card.bg-y[
##### Question
.content.tight[
What is the average air speed velocity of an unladen swallow?
]
]
.anims-on[click]
.anims-anchor-tag[tag01]
]
]
]
.ft49[
.anims-target.op0[
.anims-content[
.card.bg-g[
##### Answer
.content.tight[
What do you mean? African or European swallow?
]
]
]
.anims-cls[op0~@~op100]
.anims-target-tag[tag01]
]
]
]
.ft82[
#### Code
.col51[
##### Anchor
```js
.anims-anchor[
.anims-content[
  // content goes here
]
.anims-on[click]
.anims-anchor-tag[tag01]
]
```
]
.ft49[
##### Target
```js
.anims-target.op0[
.anims-content[
  // content goes here
]
.anims-cls[op0~@~op100]
.anims-target-tag[tag01]
]
```
]
]

---

# Anims

.ft15.subsections[
### Motivation
### Plugin
### Components
### Examples
#### Click
#### Self
]
.ft82[
## Anims Examples
### Self Animate
- Hover on the card to hide the card

.anims-target.anims-anchor.op100[
.anims-content[
.card.bg-r[
##### Quote
.content.tight[
The greatest trick the Devil ever pulled was convincing the world he didn't exist.
<br>
And "poof"!
<br>
Just like that, he's gone.
]
]
]
.anims-cls[op100~@~op0]
.anims-target-tag[tag02]
.anims-on[pointerenter~@~pointerleave]
.anims-anchor-tag[tag02]
]

#### Code

```js
.anims-target.anims-anchor.op100[
.anims-content[
  // content goes here
]
.anims-cls[op100~@~op0]
.anims-on[pointerenter~@~pointerleave]
.anims-target-tag[tag02]  .anims-anchor-tag[tag02]
]
```
]

---

# Anims

.ft15.subsections[
### Motivation
### Plugin
### Components
### Examples
#### Click
#### Self
#### Chain
]
.ft82[
## Anims Examples
### Chain Animation
- Follow the instruction

.anims-target.anims-anchor[
.anims-content[
.card.bg-y[
##### First Step
.content.tight[
Click here
]]
]
.anims-cls[display-none]
.anims-target-tag[tag04a]
.anims-on[click]
.anims-anchor-tag[tag03a~@~tag04a]
]

.anims-target.anims-anchor.display-none[
.anims-content[
.card.bg-g[
##### Second Step
.content.tight[
Then click here
]]
]
.anims-cls[display-none]
.anims-target-tag[tag03a~@~tag04b]
.anims-on[click]
.anims-anchor-tag[tag03b~@~tag04b]
]

.anims-target.display-none[
.anims-content[
.card.bg-r[
##### That's It
.content.tight[
You can chain more if you want
]]
]
.anims-cls[display-none]
.anims-target-tag[tag03b]
.anims-on[click]
.anims-anchor-tag[tag03c]
]

#### Code
.col34[
##### First Step
.font16[
```js
.anims-target.anims-anchor[
.anims-content[
  // content goes here
]
.anims-cls[display-none]
.anims-target-tag[tag04a]
.anims-on[click]
.anims-anchor-tag[tag03a~@~tag04a]
]
```
]
]
.col34[
##### Second Step
.font16[
```js
.anims-target.anims-anchor.display-none[
.anims-content[
  // content goes here
]
.anims-cls[display-none]
.anims-target-tag[tag03a~@~tag04b]
.anims-on[click]
.anims-anchor-tag[tag03b~@~tag04b]
]
```
]
]
.ft32[
##### That's It
.font16[
```js
.anims-target.display-none[
.anims-content[
  // content goes here
]
.anims-cls[display-none]
.anims-target-tag[tag03b]
.anims-on[click]
.anims-anchor-tag[tag03c]
]
```
]
]
]

---

name: Tabular
class: middle, sections

# Tabular

---

# Tabular

.ft15.subsections[
### Motivation
]
.ft82[
## Motivation
### Limitation
- Markdown table creation is too simple
    - No highlight of certain cells/rows
    - No cells spanning multiple rows
- HTML table is too complicated

#### Solution
- Adds class to highlight cell/rows
- Adds class to have a cell span multiple rows
    - This will be processed by a JavaScript after being rendered
]

---

# Tabular

.ft15.subsections[
### Motivation
### Plugin
#### Automatic
]
.ft82[
## Tabular Plugin
### Automatic
#### Method #1
- Add the following to your HTML
```html
<script
​ src="https://www.comp.nus.edu.sg/~adi-yoga/plugins/tabular/init.js"
​ type="text/javascript"></script>
```

#### Method #2
- Add the following to remark setting
```js
base: "https://www.comp.nus.edu.sg/~adi-yoga/"
```
- Add the following to your HTML
```html
<script src="plugins/tabular/init.js" type="text/javascript"></script>
```
]

---

# Tabular

.ft15.subsections[
### Motivation
### Plugin
#### Automatic
#### Manual
]
.ft82[
## Tabular Plugin
### Manual
#### Steps
1. Download the tabular plugin
2. Create the `plugins` directory
3. Copy `plugins/tabular` into your plugin directory
4. Add the following into your HTML
```html
<script src="plugins/tabular/init.js" type="text/javascript"></script>
```
]

---

# Tabular

.ft15.subsections[
### Motivation
### Plugin
### Features
#### Highlight
]
.ft82[
## Tabular Features
### Highlight

.atbl.blhead[
| Head Normal                 | .tbl-cell[tbl-bg-y]Head Yellow | Head Normal |
| --------------------------- | ------------------------------ | ----------- |
| .tbl-row[tbl-bg-g]Green row | Can be per cell                | But easier  |
| .tbl-cell[tbl-bg-r]Red cell | Only that cell                 | That's it!  |
| Can do it | for any cell, like this                 | .tbl-cell[tbl-bg-b]blue cell  |
]

#### Code
```text
| Head Normal                 | .tbl-cell[tbl-bg-y]Head Yellow | Head Normal |
| --------------------------- | ------------------------------ | ----------- |
| .tbl-row[tbl-bg-g]Green row | Can be per cell                | But easier  |
| .tbl-cell[tbl-bg-r]Red cell | Only that cell                 | That's it!  |
```

##### Customisation
- `tbl-bg-r`, `tbl-bg-g`, `tbl-bg-b`, and `tbl-bg-y` are CSS classes
    - You can add your own CSS class
]

---

# Tabular

.ft15.subsections[
### Motivation
### Plugin
### Features
#### Highlight
#### Span
]
.ft82[
## Tabular Features
### Span

.atbl.blhead[
| .tbl-span[2]Combined Head   | Normal Head                    |
| --------------------------- | ------------------------------ |
| Normal Cell                 | .tbl-span[2]Combined Cell      |
| Normal Cell                 | Normal Cell                    | Normal Cell |
| .tbl-span[3]Combined Cell      |
]

#### Code
```text
| .tbl-span[2]Combined Head   | Normal Head                    |
| --------------------------- | ------------------------------ |
| Normal Cell                 | .tbl-span[2]Combined Cell      |
| Normal Cell                 | Normal Cell                    | Normal Cell |
| .tbl-span[3]Combined Cell      |
```

##### Limitation
- Without normal cells, we may get the wrong grouping or no grouping at all
]

---

# Tabular

.ft15.subsections[
### Motivation
### Plugin
### Features
### Customisation
]
.ft82[
## Customisation
### Options
- You can customise the name of the class to be searched
    1. __Cell__: the class name instead of `tbl-cell`
    2. __Row__: the class name instead of `tbl-row`
    3. __Span__: the class name instead of `tbl-span`

#### Example
```js
tabular: {
  cell: 'tabular-cell',
  row: 'table-row',
  span: 'merge-span'
}
```
]

---

name: Player
class: middle, sections

# Player

---

# Player

.ft15.subsections[
### Motivation
]
.ft82[
## Motivation
### Limitation
- remark.js is not optimised for tablet
    - Going to prev/next slide is difficult

#### Solution
- Adds buttons to go to prev/next slide as well as to autoplay
]

---

# Player

.ft15.subsections[
### Motivation
### Plugin
#### Automatic
]
.ft82[
## Player Plugin
### Automatic
#### Method #1
- Add the following to your HTML
```html
<script
​ src="https://www.comp.nus.edu.sg/~adi-yoga/plugins/player/init.js"
​ type="text/javascript"></script>
```

#### Method #2
- Add the following to remark setting
```js
base: "https://www.comp.nus.edu.sg/~adi-yoga/"
```
- Add the following to your HTML
```html
<script src="plugins/player/init.js" type="text/javascript"></script>
```
]

---

# Player

.ft15.subsections[
### Motivation
### Plugin
#### Automatic
#### Manual
]
.ft82[
## Player Plugin
### Manual
#### Steps
1. Download the player plugin
2. Create the `plugins` directory
3. Copy `plugins/player` into your plugin directory
4. Add the following into your HTML
```html
<script src="plugins/player/init.js" type="text/javascript"></script>
```
]

---

# Player

.ft15.subsections[
### Motivation
### Plugin
### Buttons
]
.ft82[
## Buttons
.ft7[
- <i class="fa-solid fa-backward-step"></i>
- <i class="fa-solid fa-forward-step"></i><br><br>
- <i class="fa-regular fa-circle-play"></i>
- <i class="fa-solid fa-circle-notch"></i>
]
.ft93.nol.unindent[
- Go to previous slide
- Go to next slide<br><br>
- Autoplay
- Currently playing .note18[(rotating)], click to stop autplay
]

### Options
- You can quickly customise the qanvas plugin with 3 options
    1. __Size__: specifies the size of the icons
        - `"small"` .note18[(20px)], `"medium"` .note18[(24px, default)], `"large"` .note18[(28px)]
    2. __Time__: specifies the time for autoplay
        - Default is 15 seconds

#### Example
```js
qanvas: {
  size: 'small',
  time: 20
}
```
]

---

name: Notable
class: middle, sections

# Notable

---

# Notable

.ft15.subsections[
### Motivation
]
.ft82[
## Motivation
### Limitation
- Some informations are best hidden initially
    - For instance, answer to questions on the slide
    - Cards are always displayed

#### Solution
- Add interaction to cards
]

---

# Notable

.ft15.subsections[
### Motivation
### Plugin
#### Automatic
]
.ft82[
## Notable Plugin
### Automatic
#### Method #1
- Add the following to your HTML
```html
<script
​ src="https://www.comp.nus.edu.sg/~adi-yoga/plugins/notable/init.js"
​ type="text/javascript"></script>
```

#### Method #2
- Add the following to remark setting
```js
base: "https://www.comp.nus.edu.sg/~adi-yoga/"
```
- Add the following to your HTML
```html
<script src="plugins/notable/init.js" type="text/javascript"></script>
```
]

---

# Notable

.ft15.subsections[
### Motivation
### Plugin
#### Automatic
#### Manual
]
.ft82[
## Notable Plugin
### Manual
#### Steps
1. Download the notable plugin
2. Create the `plugins` directory
3. Copy `plugins/notable` into your plugin directory
4. Add the following into your HTML
```html
<script src="plugins/notable/init.js" type="text/javascript"></script>
```
]

---

# Notable

.ft15.subsections[
### Motivation
### Plugin
### Features
]
.ft82[
## Notable Features
### Clickable Card
.col51[
.card.bg-y[
##### Question
.content.tight[
What is the average air speed velocity of an unladen swallow?
]
]
]
.ft49[
.card.bg-b.notable[
##### Answer
.content.tight[
What do you mean? African or European swallow?
]
]
]
]
.UNPRINT[]

---

layout: false
class: middle, end, fadein

`That's It!`

<br>

`If you find this useful or you have any comments, feel free to email me at`

<br>

`dcsaysp (at) nus (dot) edu (dot) sg`