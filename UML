Component Diagram

@startuml
package "AI-Driven Typing Simulator" {
    [User Interface]
    [Authentication Service]
    [Profile Management Service]
    [Text Generation Service]
    [Typing Tracking Service]
    [Progress Dashboard Service]
    [Typing Lessons Service]
    [Feedback Service]
}

[User Interface] --> [Authentication Service]
[User Interface] --> [Profile Management Service]
[User Interface] --> [Text Generation Service]
[User Interface] --> [Typing Tracking Service]
[User Interface] --> [Progress Dashboard Service]
[User Interface] --> [Typing Lessons Service]
[User Interface] --> [Feedback Service]

[Authentication Service] --> [Profile Management Service]
[Text Generation Service] --> [Typing Lessons Service]
[Typing Tracking Service] --> [Feedback Service]
[Typing Tracking Service] --> [Progress Dashboard Service]
@enduml


Database schema

@startuml
entity User {
    * user_id : UUID
    * username : String
    * password_hash : String
    * email : String
    * created_at : Date
}

entity UserProfile {
    * profile_id : UUID
    * user_id : UUID
    * typing_speed : Float
    * accuracy : Float
    * progress : JSON
    * created_at : Date
}

entity TypingLesson {
    * lesson_id : UUID
    * topic : String
    * difficulty : String
    * content : Text
    * created_at : Date
}

entity TypingData {
    * data_id : UUID
    * user_id : UUID
    * lesson_id : UUID
    * speed : Float
    * accuracy : Float
    * errors : JSON
    * created_at : Date
}

UserProfile }|--|| User
TypingData }|--|| User
TypingData }|--|| TypingLesson
@enduml
