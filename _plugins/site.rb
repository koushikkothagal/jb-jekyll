module Jekyll

  # Extensions to the Jekyll Site class.

  class Site

    # Regular expression by which blog posts are recognized
    POST_PAGE_RE = /\/id\/[0-9]+\/index.html/

    # Find my blog posts among all the pages.
    def course_sections
        ['1', '2']
    end

    def test_message()
       'Hello'
    end  
      
  end
end