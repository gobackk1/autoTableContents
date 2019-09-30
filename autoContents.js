(function ($) {
  $(window).on('load', function () {
    //目次自動生成
    var $headlines = $('.blocks h2');//目次にしたいh2
    var $subHeadlines = $('.blocks h3');
    var $contentsPosition = $('.info-list');//この要素の上に目次を挿入する
    var headlinesLength = $headlines.length;
    var subHeadlinesLength = $subHeadlines.length;

    initContents();

    function initContents() {
      createContents();
      setAnchors();
    }

    //目次のDOM生成
    function createContents() {
      var contentsList = $('<div class="contents-list">');
      var title = $('<h3>', { text: '目次' });
      var frag = $(document.createDocumentFragment());
      var list = $('<ul>');
      for (var i = 0; i < headlinesLength; i++) {
        var text = $headlines[i].textContent;
        var listItem = $('<li></li>');
        var anchor = $('<a></a>', {
          href: '#a' + i,
          text: text
        });
        listItem.append(anchor);
        var h3 = $headlines.eq(i).nextUntil('h2', 'h3');
        if (h3.length) {
          var subFrag = $(document.createDocumentFragment());
          var subList = $('<ul>');
          for (var j = 0; j < subHeadlinesLength; j++) {
            var subListItem = $('<li></li>');
            var subText = $subHeadlines[j].textContent;
            var subAnchor = $('<a></a>', {
              href: '#a_' + j,
              text: subText
            });
            subListItem.append(subAnchor);
            subFrag.append(subListItem);
          }
          subList.append(subFrag);
          listItem.append(subList);
        }
        frag.append(listItem);
      }
      list.append(frag);
      contentsList.append(title).append(list);
      $contentsPosition.after(contentsList);
    }

    //目次にしたタイトルにアンカーをつける
    function setAnchors() {
      $headlines.each(function (i) {
        this.id = 'a' + i;
      });
      $subHeadlines.each(function (i) {
        this.id = 'a_' + i;
      });
    }
  });
})(jQuery);
