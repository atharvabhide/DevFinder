from .models import Project, Review, Tag
from rest_framework import serializers

class ProjectSerializer(serializers.HyperlinkedModelSerializer):
    """ 
    Serializer for Project model.
    
    Fields:
        title: CharField
        description: CharField
        featuredImage: ImageField
        demoLink: URLField
        sourceLink: URLField
        tags: ManyToManyField
        owner: ForeignKey
        voteTotal: IntegerField
        voteRatio: IntegerField
        created_at: DateTimeField
        updated_at: DateTimeField
    """
    class Meta:
        model = Project
        fields = '__all__'
    
class ReviewSerializer(serializers.HyperlinkedModelSerializer):
    """" 
    Serializer for Review model.
    
    Fields:
        value: IntegerField
        body: CharField
        project: ForeignKey
        owner: ForeignKey
        createdAt: DateTimeField
        id: UUIDField
    """
    class Meta:
        model = Review
        fields = '__all__'
    
class TagSerializer(serializers.HyperlinkedModelSerializer):
    """  
    Serializer for Tag model.
    
    Fields:
        name: CharField
        created_at: DateTimeField
        id: UUIDField
        """
    class Meta:
        model = Tag
        fields = '__all__'