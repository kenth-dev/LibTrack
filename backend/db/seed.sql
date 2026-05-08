-- LibTrack Seed Data
-- Run this in Supabase SQL Editor after schema.sql to populate test data

INSERT INTO books (title, author, description, status, cover_image) VALUES
    ('The Art of War', 'Sun Tzu', 'An ancient Chinese text on strategy and warfare. Its lessons are widely applied today in business, leadership, and conflict resolution.', 'Available', '/static/books/art-of-war.jpg'),
    ('A Game of Thrones', 'George R. R. Martin', 'Noble families compete for control of the Iron Throne in a brutal, politically complex world. Alliances shift constantly, and power often comes at a deadly cost.', 'Available', '/static/books/a-game-of-thrones.jpg'),
    ('Jane Eyre', 'Charlotte Brontë', 'An orphaned girl grows into a strong, independent woman while seeking love and respect. Her journey challenges social class and gender expectations.', 'Available', '/static/books/jane-eyre.jpg'),
    ('Crazy Rich Asians', 'Kevin Kwan', 'A woman discovers her boyfriend comes from one of the wealthiest families in Asia. She is thrust into a glamorous but judgmental world of extreme privilege.', 'Borrowed', '/static/books/crazy-rich-asians.jpg'),
    ('I Am Malala', 'Malala Yousafzai', 'A young girl speaks out for girls'' education under Taliban rule. After surviving an attack, she becomes a global symbol of courage and advocacy.', 'Available', '/static/books/i-am-malala.jpg'),
    ('Anna Karenina', 'Leo Tolstoy', 'A tragic story of love, infidelity, and societal pressure in imperial Russia. It explores the consequences of passion and the search for meaning.', 'Available', '/static/books/anna-karenina.jpg'),
    ('The Art of Seduction', 'Robert Greene', 'A guide to the psychology of attraction and persuasion. It analyzes historical figures and tactics used to influence others.', 'Available', '/static/books/the-art-of-seduction.jpg'),
    ('The 48 Laws of Power', 'Robert Greene', 'A controversial manual on gaining and maintaining power. It presents strategic principles drawn from history and politics.', 'Borrowed', '/static/books/the-48-laws-of-power.jpg'),
    ('The Metamorphosis', 'Franz Kafka', 'A man wakes up transformed into a giant insect. The story explores alienation, identity, and the burden of societal expectations.', 'Available', '/static/books/the-metamorphosis.jpg'),
    ('Pride and Prejudice', 'Jane Austen', 'A sharp romantic comedy about love, class, and first impressions. Elizabeth Bennet navigates pride, prejudice, and societal expectations.', 'Available', '/static/books/pride-and-prejudice.jpg'),
    ('1984', 'George Orwell', 'A dystopian novel about a society under constant surveillance. It warns against authoritarian control and loss of individual freedom.', 'Borrowed', '/static/books/1984.jpg'),
    ('To Kill a Mockingbird', 'Harper Lee', 'A young girl witnesses racial injustice in her community. The story highlights morality, empathy, and courage.', 'Available', '/static/books/to-kill-a-mockingbird.jpg'),
    ('The Great Gatsby', 'F. Scott Fitzgerald', 'A mysterious millionaire pursues a lost love in the Roaring Twenties. It critiques wealth, illusion, and the American Dream.', 'Available', '/static/books/the-great-gatsby.jpg'),
    ('Moby-Dick', 'Herman Melville', 'A captain obsessively hunts a legendary white whale. The novel explores fate, revenge, and human struggle against nature.', 'Available', '/static/books/moby-dick.jpg'),
    ('War and Peace', 'Leo Tolstoy', 'A vast epic following families during the Napoleonic Wars. It blends personal stories with historical events and philosophical insight.', 'Available', '/static/books/war-and-peace.jpg'),
    ('The Catcher in the Rye', 'J.D. Salinger', 'A teenager wanders New York City while struggling with alienation. His voice captures confusion, rebellion, and vulnerability.', 'Borrowed', '/static/books/the-catcher-in-the-rye.jpg'),
    ('The Hobbit', 'J.R.R. Tolkien', 'A reluctant hobbit embarks on a quest to reclaim treasure from a dragon. Along the way, he discovers courage and friendship.', 'Available', '/static/books/the-hobbit.jpg'),
    ('The Lord of the Rings', 'J.R.R. Tolkien', 'A fellowship sets out to destroy a powerful ring. Their journey shapes the fate of Middle-earth.', 'Available', '/static/books/the-lord-of-the-rings.jpg'),
    ('Brave New World', 'Aldous Huxley', 'A futuristic society maintains order through pleasure and conditioning. It questions the cost of happiness without freedom.', 'Available', '/static/books/brave-new-world.jpg'),
    ('The Hunger Games', 'Suzanne Collins', 'In a dystopian world, teens are forced to fight to the death for entertainment. One girl becomes a symbol of resistance.', 'Available', '/static/books/the-hunger-games.jpg');
