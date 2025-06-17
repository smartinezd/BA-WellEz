import ghpages from 'gh-pages';

ghpages.publish('dist/public', {
  dotfiles: true,
  add: true,        // Do not delete existing files
  clean: false,     // Prevent cleaning of existing files
  silent: false,    // Show more detailed logs
  message: 'Auto-generated commit [ci-skip]',
  git: 'git',       // Specify git executable
  repo: 'https://github.com/smartinezd/BA-WellEz.git',
  branch: 'gh-pages',
  push: true,       // Push to remote
  history: true,    // Keep the .git directory and history
}, function(err) {
  if (err) {
    console.error('Deploy failed:', err);
    console.error('Error details:', err.message);
    process.exit(1); // Exit with error code
  } else {
    console.log('Deploy complete');
    process.exit(0); // Exit successfully
  }
}); 