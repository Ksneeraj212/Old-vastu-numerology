document.getElementById('imageUpload').addEventListener('change', function (e) {
  var fileInput = e.target;
  var file = fileInput.files[0];

  if (file) {
      var reader = new FileReader();

      reader.onload = function (e) {
          var imagePreview = document.getElementById('imagePreview');
          imagePreview.innerHTML = '<img src="' + e.target.result + '" alt="Uploaded Image" style="max-width: 730px; max-height: 730px;object-fit: cover;margin: 0 auto;display: block;margin-top: 8px;margin-bottom: -110px;">';
      };

      reader.readAsDataURL(file);
  }
});

document.getElementById('imageUploadbar').addEventListener('change', function (e) {
  var fileInput = e.target;
  var file = fileInput.files[0];

  if (file) {
      var reader = new FileReader();

      reader.onload = function (e) {
          var imagePreview = document.getElementById('imagePreviewbar');
          imagePreview.innerHTML = '<img src="' + e.target.result + '" alt="Uploaded Image" style="max-width: 630px; max-height: 630px;">';
      };

      reader.readAsDataURL(file);
  }
});
function displayContent() {
  const imageInput = document.getElementById('imageInput');
  const textInput = document.getElementById('textInput');
  const displayContainer = document.getElementById('display-container');

  displayContainer.innerHTML = '';
  if (imageInput.files && imageInput.files[0]) {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(imageInput.files[0]);
      img.alt = 'Uploaded Image';
      displayContainer.appendChild(img);
  }

  const text = textInput.value;
  if (text) {
    const textWithLineBreaks = text.replace(/\n/g, '<br>');
    const textElement = document.createElement('div'); // Use a <div> to render HTML
    textElement.innerHTML = textWithLineBreaks;
    displayContainer.appendChild(textElement);
  }
}
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],
  ['link', 'image', 'video', 'formula'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']   ,
  ['Table']                                      // remove formatting button
];
const quill = new Quill("#editor", {
  modules: {
    toolbar: toolbarOptions
  },
  placeholder:"compose an epic...",
  theme:"snow",
});

var firstSelects = document.querySelectorAll('.firstSelect');
firstSelects.forEach(function(select) {
    select.addEventListener('change', function() {
        var selectedOptionValue = this.value;
        var row = this.parentNode.parentNode; 
        var secondSelect = row.querySelector('.secondSelect');
        for (var i = 0; i < secondSelect.options.length; i++) {
            var option = secondSelect.options[i];
            if (option.value === selectedOptionValue) {
                option.selected = true;
                break;
            }
        }
    });
});


function toggleTableVisibility() {
  const table = document.getElementById('zone-analysis-table');
  if (table.style.display === 'none' || table.style.display === '') {
    table.style.display = 'table';
  } else {
    table.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggle-btn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleTableVisibility);
  }
});
