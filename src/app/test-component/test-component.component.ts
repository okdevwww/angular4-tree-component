import { Component, Input } from '@angular/core';
import { TreeNode, TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';

const actionMapping:IActionMapping = {
  mouse: {
   
    dblClick: (tree, node, $event) => {
      if (node.hasChildren) TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
    },
    click: (tree, node, $event) => {
      $event.shiftKey
        ? TREE_ACTIONS.TOGGLE_SELECTED_MULTI(tree, node, $event)
        : TREE_ACTIONS.TOGGLE_SELECTED(tree, node, $event)
    }
  },
  keys: {
    [KEYS.ENTER]: (tree, node, $event) => alert(`This is ${node.data.name}`)
  }
};

@Component({
  selector: 'app-test-component',
  styleUrls: ['./test-component.component.scss'],
  templateUrl: './test-component.component.html',
})
export class TestComponentComponent {
  nodes: any[];
  nodes2 = [{name: 'root'}, {name: 'root2'}];
  constructor() {
  }
   ngOnInit() {
     this.nodes =[
        {
          "id": 1,
          "name": "node1",
          "children": [
            {
              "id": 11,
              "name": "node1.1",
              "children": [
                {
                  "id": 111,
                  "name": "node1.1.1",
                  "children": []
                }
              ]
            },
            {
              "id": 12,
              "name": "node1.2",
              "children": []
            }
          ]
        },
        {
          "id": 2,
          "name": "node2",
          "nodrop": true,
          "children": [
            {
              "id": 21,
              "name": "node2.1",
              "children": []
            },
            {
              "id": 22,
              "name": "node2.2",
              "children": []
            }
          ]
        },
        {
          "id": 3,
          "name": "node3",
          "children": [
            {
              "id": 31,
              "name": "node3.1",
              "children": []
            }
          ]
        }
      ]
    
  }

  addNode(node, index, tree, $event) {
    let newName = node.data.name + "." + (node.data.children.length+1);
    node.data.children.push({
      name: newName,
      "children": []
      });
      TREE_ACTIONS.EXPAND(tree, node, $event)
      tree.treeModel.update();
  }

  removeNode(node, index, tree, $event) {
    let parent  = node.parent.data.children;
    let child = node.data;
    for(let i =0; i < parent.length; i++ ){
      if(parent[i]==child) {
        parent.splice(i, 1);
        console.log(parent[i]);
        break;
      }
    }
    tree.treeModel.update();
    console.log(child);
  }

  childrenCount(node: TreeNode): string {
    return node && node.children ? `(${node.children.length})` : '';
  }

  filterNodes(text, tree) {
    tree.treeModel.filterNodes(text);
  }

  activateSubSub(tree) {
    // tree.treeModel.getNodeBy((node) => node.data.name === 'subsub')
    tree.treeModel.getNodeById(1001)
      .setActiveAndVisible();
  }

  customTemplateStringOptions: ITreeOptions = {
    // displayField: 'subTitle',
    isExpandedField: 'expanded',
    idField: 'uuid',
    // getChildren: this.getChildren.bind(this),
    actionMapping,
    nodeHeight: 23,
    allowDrag: true,
    useVirtualScroll: true,
    animateExpand: true,
    animateSpeed: 30,
    animateAcceleration: 1.2
  }
  onEvent(event) {
    console.log(event);
  }

  go($event) {
    $event.stopPropagation();
    alert('this method is on the app component');
  }

  activeNodes(treeModel) {
    console.log(treeModel.activeNodes);
  }
}
