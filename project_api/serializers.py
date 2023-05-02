from .models import Project, Review, Tag
from rest_framework import serializers


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'

class ProjectSerializer(serializers.HyperlinkedModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
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
    
class ReviewSerializer(serializers.ModelSerializer):
    owner = serializers.SerializerMethodField()
    project = serializers.CharField(source='project.title', read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'project', 'body', 'value', 'createdAt']

    def get_owner(self, obj):
        return obj.owner.user.username if obj.sender else None


    def create(self, validated_data):
        project_pk = self.context['view'].kwargs.get('pk')
        try:
            project = Project.objects.get(pk=project_pk)
        except Project.DoesNotExist:
            raise serializers.ValidationError(f"Project with ID {project_pk} does not exist")

        return Review.objects.create(
            project=project,
            body=validated_data['body'],
            value=validated_data['value'],
        )

    
