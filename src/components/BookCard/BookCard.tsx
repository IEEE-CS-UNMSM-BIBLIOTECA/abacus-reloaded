import { Image as MantineImage, Text, Box, Stack, Flex, Menu } from '@mantine/core';
import { IconDots } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import Links from '../Links';
import { DocumentTypePreview } from '@/types';

interface Option {
  label: string;
  onClick: () => void;
}

interface BookCardProps {
  data: DocumentTypePreview;
  options?: Option[];
}

const BookCard = ({ data, options = [] }: BookCardProps) => {
  const [aspectRatio, setAspectRatio] = useState(1);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      setAspectRatio(img.width / img.height);
    };
    img.src = data.cover_url;
  }, [data.cover_url]);

  // console.log(data.authors);

  return (
    <Stack
      bg="transparent"
      style={{
        height: 'fit-content',
        width: '100%',
      }}
      gap="xs"
    >
      <div
        style={{
          position: 'relative',
          paddingTop: `${100 / aspectRatio}%`,
          width: '100%',
        }}
      >
        <MantineImage
          src={data.cover_url}
          alt={data.title}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
      <Box>
        <Flex align="center" justify="space-between">
          <Text size="lg" fw={500}>
            <a href={`/book/${data.id}`}>
              {data.title}
            </a>
          </Text>
          {options.length > 0 && (
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <IconDots size={20} style={{ cursor: 'pointer' }} />
              </Menu.Target>
              <Menu.Dropdown>
                {options.map((option, index) => (
                  <Menu.Item key={index} onClick={option.onClick}>
                    {option.label}
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
          )}
        </Flex>
        <Text size="sm">
          <Links links={(data.authors.map((author) => ({
            href: `/author/${author.id}`,
            label: author.name,
          })))} />
        </Text>
      </Box>
    </Stack>
  );
};

export default BookCard;
