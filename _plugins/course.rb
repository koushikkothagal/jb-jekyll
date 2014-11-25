module Jekyll
    class DiscussionDocument < Jekyll::Document
        def initialize(path, relations)
            @site = relations[:site]
            @path = path
            @extname = File.extname(path)
            @collection = relations[:collection]
            @has_yaml_header = nil

            self.read
            @path = generateFakePath(path)

            self.data['layout'] = 'forum'
            self.data['title'] = 'Discussions'
            # self.data['permalink'] = relations[:url].sub unitName + '-' + lessonName + '-' + sectionName, newName
            self.data['forum-index'] = path.dup
        end


        def generateFakePath(path)
            pathSplit = path.split('/')
            fileName = pathSplit.last
            # pathSplit[0] is blank. pathSplit[1] is '_sections'
            courseName = pathSplit[2]
            fileNameSplit = fileName.split('-')
            unitName = fileNameSplit[0]
            lessonName = fileNameSplit[1]
            sectionName = fileNameSplit[2]
            newName = unitName + '-' + lessonName + '-forum'    
            fakePath = path.dup.sub unitName + '-' + lessonName + '-' + sectionName, newName
            fakePath
        end    

    end    
end



module Reading
  class CourseData < Liquid::Drop
      
      def initialize()
          @name = ''
          @units = []
          @courseDocument = []
      end
      
      attr_reader :name, :units, :courseDocument
      attr_writer :name, :units, :courseDocument
     
  end 

  class Unit < Liquid::Drop
      def initialize()
          @name = ''
          @number = ''
          @desc = ''
          @lessons = []
      end
      
      attr_reader :name, :lessons, :number, :desc
      attr_writer :name, :lessons, :number, :desc
  end 

  class Lesson < Liquid::Drop
      def initialize()
          @name = ''
          @title = ''
          @desc = ''
          @video = ''
          @url = ''
          @prevLesson = ''
          @nextLesson = ''
          @sections = []
      end
      
      attr_reader :name, :sections, :video, :title, :desc, :url, :prevLesson, :nextLesson
      attr_writer :name, :sections, :video, :title, :desc, :url, :prevLesson, :nextLesson
  end 
    
 

    
      
      
  class Generator < Jekyll::Generator
      
      
    def getCourseDocument(site, currentCourseName)  
        site.collections['courses'].docs.each do |course|
            if course.data['course_id'] == currentCourseName
                return course
            end
        end    
    end
    
    def doLessonWiring(course)  
        for u in 0..course.units.size-1
            unit = course.units[u]
            if u > 0 
                lastLessonOfPrevUnit = course.units[u-1].lessons[-1]
                lastLessonOfPrevUnit.nextLesson = unit.lessons[0]
                unit.lessons[0].prevLesson = lastLessonOfPrevUnit
            end    

            for i in 0..unit.lessons.size-1
                if i > 0 && !unit.lessons[i-1].nil? && !unit.lessons[i-1].nextLesson.nil?
                    unit.lessons[i-1].nextLesson = unit.lessons[i]
                end 
                if !unit.lessons[i+1].nil? && !unit.lessons[i+1].prevLesson.nil? 
                    unit.lessons[i+1].prevLesson = unit.lessons[i]
                end
            end
        end    

    end
      
      
      
    def generate(site)
        
        forumDocs = []
        site.collections['sections'].docs.each do |doc|
            forumDoc = Jekyll::DiscussionDocument.new(doc.path, { site: site, collection: doc.collection, url: doc.url})
            forumDocs << forumDoc
        end    
        
        forumDocs.each do |forumDoc|
            site.collections['sections'].docs << forumDoc
        end    
        
        
        courseMap = Hash.new
        site.collections['sections'].docs.each do |doc|
            
            path = doc.path
            # Remove the base path
            path.sub! site.source, ''
            # Remove file extension
            # path.sub! '.markdown', ''
            
            pathSplit = path.split('/')
            fileName = pathSplit.last
            # pathSplit[0] is blank. pathSplit[1] is '_sections'
            courseName = pathSplit[2]
            fileNameSplit = fileName.split('-')
            unitName = fileNameSplit[0]
            lessonName = fileNameSplit[1]
            sectionName = fileNameSplit[2]
            
           
            fileName.sub! unitName + '-' + lessonName + '-' + sectionName, ''
            fileName.gsub! '-', ' '
            fileName.sub! '.markdown', ''
            
            # Set the values identified by the path and file name into the document's metadata
            doc.data['courseName'] = courseName
            doc.data['unitName'] = unitName
            doc.data['lessonName'] = lessonName
            doc.data['sectionName'] = sectionName
            doc.data['filename'] = fileName
            
            # Handling legacy courses
            if doc.data['layout'] != 'lesson' 
                
                if doc.data['layout'] != 'forum'
                    doc.data['title'] = "Video"
                    doc.data['layout'] = 'lesson'
                    doc.data['lesson_title'] = fileName
                    doc.data['legacy'] = 'true'
                end
                if doc.data['lesson_desc'].to_s.empty?  
                    doc.data['lesson_desc'] = doc.content.dup.lines.first
                end    

                
                
                # Remove youtube include tags. Regex is - Any string .* that starts with ^ the characters "{%" and upto the end of line $
                # doc.data['lesson_desc'].gsub! /^{%.*$/, ''
                # doc.data['lesson_desc'].strip()
                
                
            end
            
            # Create a key to A) Add to the map and B) Help sort all sections
            key = courseName + '-' + unitName + '-' + lessonName + '-' + sectionName
            courseMap[key] = doc
            
            
        end    
        
        
        # Sort based on key. Now all sections are sorted in order of course name > unit > lesson > section
        courseMap = courseMap.sort
        site.data['courseArray'] = courseMap
        
        
        allCourses = []
        prevCourseName = ''
        prevUnitName = ''
        prevLessonName = ''
        courseData = CourseData.new()
        unit = Unit.new()
        lesson = Lesson.new()
        
        courseMap.each_with_index do |x, xi|
            
            currentCourseName = x[1].data['courseName']
            if currentCourseName != prevCourseName 
                doLessonWiring(courseData)
                courseData = CourseData.new()
                courseData.courseDocument = getCourseDocument(site, currentCourseName)
                courseData.name = currentCourseName
                allCourses.push(courseData)
                prevCourseName = currentCourseName
                prevUnitName = ''
            end
            
            currentUnitName = x[1].data['unitName']
            if currentUnitName != prevUnitName 
                
                unit = Unit.new()
                unit.name = currentUnitName
                courseData.units.push(unit)
                prevUnitName = currentUnitName
                prevLessonName = ''
            end
            
            currentLessonName = x[1].data['lessonName']
            if currentLessonName != prevLessonName 
                lesson = Lesson.new()
                lesson.name = currentLessonName
                unit.lessons.push(lesson)
                prevLessonName = currentLessonName
            end
            
            if !x[1].data['unit_desc'].to_s.empty?
                unit.desc = x[1].data['unit_desc']
            end    
            
            if !x[1].data['lesson_video'].to_s.empty?
                lesson.video = x[1].data['lesson_video']
            end   
            
            if !x[1].data['lesson_title'].to_s.empty?
                lesson.title = x[1].data['lesson_title']
            end    
            
            if lesson.desc.to_s.empty?
                lesson.desc = x[1].data['lesson_desc']
            end
            
            if lesson.url.to_s.empty?
                lesson.url = x[1].url
            end    
            
            
            lesson.sections.push(x[1])
            
        end
            
        
        
        site.data['courseData'] = allCourses
        

        
    end
      
      
    
      
  end
end