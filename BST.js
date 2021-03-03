

(function () {
    var MaxInt = 100;                                 /// this is the max rand Value.
    window.BST = Node;                                //this is all i will expose(singleton). the rest will be protoTypes
    Node.prototype.reSizeRoot = reSizeRoot;           //resizes the Root so it will fit all the children
    Node.prototype.findNode = findNode;               //find node
    Node.prototype.removeNode = RemoveNode;           //remove node
    Node.prototype.addNode = AddNode;                 //add node
    Node.prototype.addElementClick = addElementClick; //adds random number node maxInt set above
    Node.prototype.getMax = getMax;                   //gets max node
    Node.prototype.getMin = getMin;                   //get min node
    Node.prototype.preOrder = preOrder;               //Pre Order 
    Node.prototype.inOrder = inOrder;                 //In order 
    Node.prototype.reverseOrder = reverseOrder;       //In order 
    Node.prototype.postOrder = postOrder;             //Post Order

    var counter = (function () { var a = 1; return function () { a = a + 1; return a; } })();

    function reSizeRoot() {
        var Left = $($('.Tree > div > .ChildR')[0]).width();
        var Right = $($('.Tree > div > .ChildL')[0]).width();
        $('.Tree').css('width', Left + Right + 20);
    };

    function addElementClick() {
        var newVal = Math.floor(Math.random() * MaxInt)
        if ($('#NewValue').val() != '') { newVal = parseInt($('#NewValue').val()) };
        $('#NewValue').val('');
        AddNode(new Node({ value: newVal }), this);
    };

    function AddNode(node, Root) {
        if ((!Root) || (!Root.value)) { Root = this; $.extend(Root, node) } // if no Root we will create this node as root...
        else {
            if (Root.value <= node.value) {
                if (Root.right === null) {                 //if null add here
                    node.parent = Root; Root.right = node; //set parent and add ref new node
                    Root.html.right.html(node.html.html)   // update HTML
                    reSizeRoot();                          //Resize Parent (or tree does not look right)
                }
                else { AddNode(node, Root.right) }         //else recures
            }
            if (Root.value > node.value) {
                if (Root.left === null) {                 //if null add here
                    node.parent = Root; Root.left = node; //set parent and add node
                    Root.html.left.html(node.html.html);  //update HTML
                    reSizeRoot();                         //REsize Parent to fit all child nodes..
                }
                else { AddNode(node, Root.left) }        //else recures
            }
        }
        return Root;                                     //always return root for chaining....
    };

    //simple recursive getmin and getmax :) 
    function getMin(node) { if (!node) { node = this }; if (node.left) { return getMin(node.left); } return node; };
    function getMax(node) { if (!node) { node = this }; if (node.right) { return getMax(node.right); } return node; };

    // now for the trickey part... removing nodes.
    function RemoveNode(node) {
        if (!node) { node = this; }                    // if called as node.remove
        if (!node.parent) { alert('No deleting parent (yet)'); return node; } //maybe soon we will be able to delete Root
        var isRight = node.parent.right === node;       //is this the right node? if not it left!
        var hasRight = node.right != null;
        var hasLeft = node.left != null;

        //is this is a leaf node? no left or right?
        if ((!node.right) && (!node.left)) {
            node.html.Name.html('Null'); node.html.left.remove(); node.html.right.remove();  // Rest the HTML
            if (isRight) { node.parent.right = null };                       //is Right set Null
            if (!isRight) { node.parent.left = null };                     //isLeft SetNull
            node = null;
        }

        //if we have only 1 child 
        //only error case would be if left and right are false however node would be set to null from above and this would test false!!!
        if (node && (hasLeft ^ hasRight)) {
            if (isRight && hasRight) {
                node.parent.right.html.html.replaceWith(node.right.html.html);
                node.parent.right = node.right;
                node.right.parent = node.parent;
            }
            if (isRight && hasLeft) {
                node.parent.right.html.html.replaceWith(node.left.html.html);
                node.parent.right = node.left;
                node.left.parent = node.parent;
            }
            if ((!isRight) && hasRight) {
                node.parent.left.html.html.replaceWith(node.right.html.html);
                node.parent.left = node.right;
                node.right.parent = node.parent;
            }
            if ((!isRight) && hasLeft) {
                node.parent.left.html.html.replaceWith(node.left.html.html);
                node.parent.left = node.left;
                node.left.parent = node.parent;
            }
        }

        //now if we have left and right there are 2 possibilites.. either min or max.. i will use max..
        if (node && hasLeft && hasRight) {
            var max = getMax(node.left);
            node.value = max.value;
            node.html.Name.html(max.html.Name.html());
            RemoveNode(max); //now recures! (getting good at this!)
        }
        reSizeRoot(); // just to keep things looking nice!;
    }

    function findNode(value, id, node) {
        if (!node) { node = this };
        if (node.value == value) {
            if (id && (id == node.id)) { return node; }                            //checking for duplicate value
            if (id && (id != node.id)) { return findNode(value, id, node.right); }//if we have duplicate value then go right (>)
            if ((!id)) { return node }
        }
        if (node.value >= value) { return findNode(value, id, node.left) }
        else { return findNode(value, id, node.right) }
    }

    //will return comma seperated array
    function inOrder(node) {
        if (!node) { node = this; };
        var returnVar = []
        if (node.left) { returnVar = returnVar.concat(inOrder(node.left)) }
        returnVar = returnVar.concat([node.value])
        if (node.right) { returnVar = returnVar.concat(inOrder(node.right)) }
        return returnVar
    };

    function reverseOrder(node) {
        if (!node) { node = this; };
        var returnVar = []
        if (node.right) { returnVar = returnVar.concat(reverseOrder(node.right)) }
        returnVar = returnVar.concat([node.value])
        if (node.left) { returnVar = returnVar.concat(reverseOrder(node.left)) }
        return returnVar
    };

    function preOrder(node) {
        if (!node) { node = this };
        var returnVar = [];
        returnVar= returnVar.concat(node.value);
        if (node.left) { returnVar=returnVar.concat(preOrder(node.left)); }
        if (node.right) { returnVar = returnVar.concat(preOrder(node.right)); }
        return returnVar;
    }

    function postOrder(node) {
        if (!node) { node = this };
        var returnVar = [];
        if (node.left) { returnVar = returnVar.concat(postOrder(node.left)); }
        if (node.right) { returnVar = returnVar.concat(postOrder(node.right)); }
        returnVar = returnVar.concat(node.value);
        return returnVar;
    }

    //this is nodeObj
    //{value,left,right,parent}
    function Node(obj) {
        $.extend(obj, { left: null, right: null, parent: null });
        this.value = obj.value;
        this.left = obj.left;
        this.right = obj.right;
        this.parent = obj.parent;
        this.id = counter();
        this.html = {
            left: $('<div class="ChildL" tid=""><div class="DisplayName">Null</div></div>'),
            right: $('<div class="ChildR" tid=""><div class="DisplayName">Null</div></div>'),
            Name: $('<div class="DisplayName" NodeID = "' + this.id + '">' + obj.value + '</div>')
        }
        this.html.html = $('<div></div>').append(this.html.Name).append(this.html.left).append(this.html.right);
    }
}())