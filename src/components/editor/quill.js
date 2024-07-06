import { Quill } from '@vueup/vue-quill'
var BlockEmbed = Quill.import('blots/block/embed')
class ImageBlot extends BlockEmbed {
  static create(value) {
    let node = super.create();
    node.setAttribute('src', value.url);
    node.setAttribute('id', value.id)
    node.setAttribute('width', '60px')
    node.setAttribute('height', 'auto')
    return node;
  }

  static value(node) {
    return {
      url: node.getAttribute('src'),
      id: node.getAttribute('id'),
    }
  }
}
ImageBlot.blotName = 'image';
ImageBlot.tagName = 'img';
Quill.register(ImageBlot)

