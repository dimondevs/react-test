$(function() {
    $('#search-movie').on('submit', function(e) {
        e.preventDefault();
        var $this = $(this);
        var formData = $this.serialize();
        var formAction = $this.attr('action');
        fetch(formAction + '?' + formData)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            var content = '';
            $.each(data.results, function(idx, item) {
                content += '<tr>';
                content += '<td>' + item.id + '</td>';
                content += '<td>' + item.original_title + '</td>';
                content += '<td>' + item.original_language + '</td>';
                content += '<td>' + item.vote_average + '</td>';
                content += '<td>' + item.vote_count + '</td>';
                content += '<td>' + item.popularity + '</td>';
                content += '<td>' + item.release_date + '</td>';
                content += '</tr>';
            });
            $('#result tbody').empty();
            $('#result tbody').append(content);
            $('#result').fadeIn();
            $('#result').sortable();
        })
    });
})
